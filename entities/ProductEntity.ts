import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";

export default class ProductEntity extends Entity {
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


    this.watchFetchProduct = this.watchFetchProduct.bind(this)

  }

  /**fetchProduct(action) {
    try {
      const id = parseInt(action.id);
      yield call(this.xRead, `/products/${id}/extended`);
    } catch (error) {
      yield put({ type: actionTypes.PRODUCT_FETCH_FAILED, error });
    }
  }*/

  *fetchProductNew(action) {
    try {
      const id = parseInt(action.id);
      yield call(this.xRead, `/products/${id}/extended`);
    } catch (error) {
      yield put({ type: actionTypes.PRODUCT_FETCH_FAILED, error });
    }
  }

  *addFeedbackToProduct(action) {
    try {
      const feedbackData = action.feedbackData;
      yield call(
        this.xSave,
        `/products/${feedbackData.product_id}/addFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );
    } catch (error) {
      yield put({ type: actionTypes.ADD_FEEDBACK_TO_PRODUCT_FAILED, error });
    }
  }

  *watchFetchProduct() {
    while (true) {
      const { payload } = yield take(actionTypes.PRODUCT_REQUESTED);
      yield put(
        actionTypes.action(actionTypes.SELECT_PRODUCT_ID, {
          payload: { data: payload.id },
        })
      );
      yield call(this.fetchProductNew, payload);
    }
  }

  *watchAddFeedbackToProduct() {
    while (true) {
      const { payload } = yield take(
        actionTypes.ADD_FEEDBACK_TO_PRODUCT_REQUESTED
      );
      yield call(this.addFeedbackToProduct, payload);
    }
  }

  public sagas(): any[] {
    return [
      this.watchFetchProduct,
      this.watchAddFeedbackToProduct
    ]
  }
}
