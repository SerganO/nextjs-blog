import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./action";
import reducer from "./reducer";

@reducer("products")
export default class ProductEntity extends Entity<ProductEntity> {
  constructor(opts: any) {
    super(opts);
    const user = new schema.Entity("users");

    const feedback = new schema.Entity("feedbacks", {
      author: user,
    });

    this.initSchema("products", {
      vendor: user,
      feedbacks: [feedback],
    });
  }

  @action()
  public *addFeedbackToProduct(data) {
    const feedbackData = data.feedbackData;
    yield call(
      this.xSave,
      `/products/${feedbackData.product_id}/addFeedback`,
      feedbackData
    );
  }

  @action()
  public *fetchProduct(data) {
    yield call(this.xRead, `/products/${parseInt(data.id)}/extended`);
    yield put(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        payload: {
          data: {
            key: "SELECTED_PRODUCT_ID",
            value: data.id,
          },
        },
      })
    );
  }

  @action()
  public *fetchMainProductPage() {
    yield call(this.xRead, `/products/feedbacksIncluded/firstSet`);
  }

  @action()
  public *fetchProductsPage(data) {
    yield call(
      this.pageEntity,
      `/products/pagination`,
      data
    );
  }

  /*@action()
  public *fetchProductPage(data) {
    console.log("in call fetchProductPage");
    yield call(
      this.xRead,
      `/products/pagination?page=${data.page}${data.userString}`
    );
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
  }*/

  /* @action()
  public addFeedbackToProductInvokable(data, isSagaCall = false) {
    function* saga(data) {
      const feedbackData = data.feedbackData;
      yield call(
        this.xSave,
        `/products/${feedbackData.product_id}/addFeedback`,
        feedbackData
      );
    }
    return this.invokableSaga(
      this.addFeedbackToProductInvokable.name,
      isSagaCall,
      saga,
      data
    );
  }

  @action()
  public fetchProductInvokable(data, isSagaCall = false) {
    function* saga(data) {
      yield call(this.xRead, `/products/${parseInt(data.id)}/extended`);
      yield put(
        actionTypes.action(actionTypes.UPDATE_VALUE, {
          payload: {
            data: {
              key: "SELECTED_PRODUCT_ID",
              value: data.id,
            },
          },
        })
      );
    }
    return this.invokableSaga(
      this.fetchProductInvokable.name,
      isSagaCall,
      saga,
    
    );
  }*/
}
