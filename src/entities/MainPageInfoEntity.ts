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
      products: [product]
    })

  }

/*  @action()
  public fetchMainProductPageInvokable(data, isSagaCall = false) {
    function* saga(data) {
      console.log("in fetchProductPageInvokable saga call");
      yield call(
        this.xRead,
        `/products/pagination?page=${data.page}${data.userString}`
      );
      console.log("in fetchProductPageInvokable saga put");
      yield put(
        actionTypes.action(actionTypes.UPDATE_VALUE, {
          payload: {
            data: {
              key: "SELECTED_PAGE",
              value: data.page,
            },
          },
        })
      );
    }
    return this.invokableSaga(
      "fetchProductPageInvokable",
      isSagaCall,
      saga,
      data
    );
  }*/

  @action()
  *fetchMainProductPage() {
    yield call(
      this.xRead,
      `/products/feedbacksIncluded/firstSet`
    );
  } 
}
