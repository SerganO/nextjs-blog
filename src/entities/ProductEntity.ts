import { call, put, take } from "redux-saga/effects";
import { BaseEntity } from "./BaseEntity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./decorators/action";
import reducer from "./decorators/reducer";

@reducer("products")
export default class ProductEntity extends BaseEntity<ProductEntity> {
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
      `/products/${feedbackData.productId}/addFeedback`,
      feedbackData
    );
  }

  @action()
  public *setCurrentProduct(data) {
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

}
