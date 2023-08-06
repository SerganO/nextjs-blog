import * as actionTypes from "./actionTypes";

export const saveProductAction = (data) =>
  actionTypes.action(actionTypes.PRODUCT_FETCH_SUCCEEDED, { payload: data });
export const productRequestAction = (data) =>
  actionTypes.action(actionTypes.PRODUCT_REQUESTED, data);

export const saveUserAction = (data) =>
  actionTypes.action(actionTypes.ADD, { payload: data });
export const userRequestAction = (data) =>
  actionTypes.action(actionTypes.USER_REQUESTED, data);

export const saveProductPageAction = (data) =>
  actionTypes.action(actionTypes.ADD, {
    payload: data,
  });
export const productPageRequestAction = (data) =>
  actionTypes.action(actionTypes.PRODUCT_PAGE_REQUESTED, data);

export const saveMainProductPageAction = (data) =>
  actionTypes.action(actionTypes.ADD, {
    payload: data,
  });
export const mainProductPageRequestAction = () =>
  actionTypes.action(actionTypes.MAIN_PRODUCT_PAGE_REQUESTED, {});

export const addFeedbackAction = (data) =>
  actionTypes.action(actionTypes.ADD_FEEDBACK_TO_PRODUCT_REQUESTED, data);