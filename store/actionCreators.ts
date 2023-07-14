import xfetch from "functions/xfetch";
import * as actionTypes from "./actionTypes";
import { IFeedback } from "server/models/Feedback";

export function addFeedback(feedback: IFeedbackPostData, success, failure) {
  return (dispatch: DispatchType) => {
    xfetch(
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

export function simulateHttpRequest(action: StoreAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
