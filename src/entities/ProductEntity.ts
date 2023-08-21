import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./action";
import { useDispatch } from "react-redux";

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
  }

  @action()
  *addFeedbackToProduct(data) {
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
        
        payload: { data: {
          key: "SELECTED_PRODUCT_ID",
          value: data.id
        } },
      }
    )
      /*actionTypes.action(actionTypes.SELECT_PRODUCT_ID, {
        payload: { data: data.id },
      })*/
    );
  }

}
