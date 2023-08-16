import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";

export default class MainPageInfoEntity extends Entity {
  constructor(opts: any) {
    super(opts);
    const user = new schema.Entity("users");

    const feedback = new schema.Entity("feedbacks", {
      author: user,
    });

    const product = new schema.Entity("products", {
      vendor: user,
      feedbacks: [feedback],
    });

    
    this.initSchema("mainPageInfos", {
      products: [product]
    })

    this.watchFetchMainProductPage = this.watchFetchMainProductPage.bind(this)
  }

  /**fetchMainProductPage() {
    try {
     yield call(
        this.xRead,
        `/products/feedbacksIncluded/firstSet`
      );
    } catch (error) {
      yield put({ type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_FAILED, error });
    }
  }*/

  *fetchMainProductPageNew() {
    try {
      yield call(
        this.xRead,
        `/products/feedbacksIncluded/firstSet`
      );
    } catch (error) {
      yield put({ type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_FAILED, error });
    }
  } 

  *watchFetchMainProductPage() {
    while (true) {
      yield take(actionTypes.MAIN_PRODUCT_PAGE_REQUESTED);
      yield call(this.fetchMainProductPageNew);
    }
  }

  public sagas(): any[] {
    return [
      this.watchFetchMainProductPage
    ]
  }

}
