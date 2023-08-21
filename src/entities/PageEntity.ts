import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./action";

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

    this.initSchema(
      "pages",
      {
        products: [product],
      },
      { idAttribute: "page" }
    );
  }

  @action()
  public fetchProductPageInvokable(data, isSagaCall = false) {
    const object = this;
    function* saga(data) {
      console.log("in fetchProductPageInvokable saga call");
      yield call(
        object.xRead,
        `/products/pagination?page=${data.page}${data.userString}`
      );
      console.log("in fetchProductPageInvokable saga put");
      yield put(
        actionTypes.action(actionTypes.SELECT_PAGE, {
          payload: { data: data.page },
        })
      );
    }
    return this.invokableSaga(
      "fetchProductPageInvokable",
      isSagaCall,
      saga,
      data
    );
  }

  @action()
  *fetchProductPage(data) {
    console.log("in call fetchProductPage");
    yield call(
      this.xRead,
      `/products/pagination?page=${data.page}${data.userString}`
    );
    yield put(
      actionTypes.action(actionTypes.SELECT_PAGE, {
        payload: { data: data.page },
      })
    );
  }
}
