import xfetch from "functions/xfetch";
import * as actionTypes from "./actionTypes";
import { IFeedback } from "server/models/Feedback";

export function addFeedback(feedback: IFeedbackPostData, success, failure) {
  return async (dispatch: DispatchType) => {
    await xfetch(
      `/api/feedbacks/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      },
      (data) => {
        const action: StoreAction = {
          type: actionTypes.ADD_FEEDBACK,
          payload: {data: data },
        };

        dispatch(action);
        success(data);
      },
      failure
    );
  };

  //return simulateHttpRequest(action)
}

export function removeFeedback(feedback: IFeedback) {
  const action: StoreAction = {
    type: actionTypes.REMOVE_FEEDBACK,
    payload: { data: feedback },
  };

  return simulateHttpRequest(action);
}

export function getProduct(id, success, failure) {
  return (dispatch: DispatchType) => {
    xfetch(
      `/api/products/${id}/extended`,
      {},
      (data) => {
        const action: StoreAction = {
          type: actionTypes.GET_PRODUCT,
          payload: {data: data },
        };

        dispatch(action);
        success(data);
      },
      failure
    );
  }
}

export const saveProductToRedux = (product) => ({
  type: actionTypes.GET_PRODUCT,
  payload: {data: product },
});

export const saveUserToRedux = (user) => ({
  type: actionTypes.GET_USER,
  payload: {data: user },
});

export const saveFirstSetToRedux = (products) => ({
  type: actionTypes.GET_FIRST_SET,
  payload: {data: products },
});

export const saveProductsPageToRedux = (products) => ({
  type: actionTypes.GET_PRODUCT_PAGE,
  payload: {data: products },
});

export function simulateHttpRequest(action: StoreAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
