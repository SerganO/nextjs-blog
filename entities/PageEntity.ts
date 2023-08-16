import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";

export default class PageEntity extends Entity {
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

    this.initSchema("pages", {
      products: [product],
    }, {idAttribute: "page"});

    this.watchFetchProductPage = this.watchFetchProductPage.bind(this)
  }

  *fetchProductPage(action) {
    try {
      yield call(
        this.xRead,
        `/products/pagination?page=${action.page}${action.userString}`
      );
      yield put(
        actionTypes.action(actionTypes.SELECT_PAGE, {
          payload: { data: action.page },
        })
      );
    } catch (error) {
      yield put({ type: actionTypes.PRODUCT_PAGE_FETCH_FAILED, error });
    }
  }

  *watchFetchProductPage() {
    while (true) {
      const { payload } = yield take(actionTypes.PRODUCT_PAGE_REQUESTED);
      yield call(this.fetchProductPage, payload);
    }
  }

  public sagas(): any[] {
    return [
      this.watchFetchProductPage
    ]
  }


}
