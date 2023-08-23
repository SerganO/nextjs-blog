import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./action";

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
      products: [product],
    });
  }

  @action()
  *fetchMainProductPage() {
    yield call(this.xRead, `/products/feedbacksIncluded/firstSet`);
  }

  /*@action()
  public fetchMainProductPageInvokable(isSagaCall = false) {
    function* saga(data) {
      yield call(
      this.xRead,
      `/products/feedbacksIncluded/firstSet`
    );
    }
    return this.invokableSaga(
      this.fetchMainProductPageInvokable.name,
      isSagaCall,
      saga,
    );
  }*/
}
