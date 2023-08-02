import { take, call, put } from "redux-saga/effects";

import { _xfetch } from "functions/xfetch";
import * as actionTypes from "../actionTypes";

function* fetchProduct(action) {
  try {
    const id = parseInt(action.id);
    const data = yield call(_xfetch, `/api/products/${id}/extended`);
    yield put({ type: actionTypes.PRODUCT_FETCH_SUCCEEDED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.PRODUCT_FETCH_FAILED, error });
  }
}

function* fetchProductPage(action) {
  try {
    const data = yield call(
      _xfetch,
      `/api/products/pagination?page=${action.page}${action.userString}`
    );
    yield put({
      type: actionTypes.PRODUCT_PAGE_FETCH_SUCCEEDED,
      payload: { data },
    });
    yield put(
      actionTypes.action(actionTypes.SELECT_PAGE, {
        payload: { data: action.page },
      })
    );
  } catch (error) {
    yield put({ type: actionTypes.PRODUCT_PAGE_FETCH_FAILED, error });
  }
}

function* fetchMainProductPage() {
  try {
    const data = yield call(
      _xfetch,
      `/api/products/feedbacksIncluded/firstSet`
    );
    yield put({
      type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_SUCCEEDED,
      payload: { data: { products: data }},
    });
  } catch (error) {
    yield put({ type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_FAILED, error });
  }
}

function* addFeedbackToProduct(action) {
  try {
    const feedback = action.feedbackData;
    const data = yield call(_xfetch, `/api/products/${feedback.product_id}/addFeedback`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });
    yield put({ type: actionTypes.ADD_FEEDBACK_TO_PRODUCT_SUCCEEDED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.ADD_FEEDBACK_TO_PRODUCT_FAILED, error });
  }
}

export function* watchFetchProduct() {
  while (true) {
    const { payload } = yield take(actionTypes.PRODUCT_REQUESTED);
    yield put(
      actionTypes.action(actionTypes.SELECT_PRODUCT_ID, {
        payload: { data: payload.id },
      })
    );
    yield call(fetchProduct, payload);
  }
}

export function* watchFetchProductPage() {
  while (true) {
    const { payload } = yield take(actionTypes.PRODUCT_PAGE_REQUESTED);
    yield call(fetchProductPage, payload);
  }
}

export function* watchFetchMainProductPage() {
  while (true) {
    yield take(actionTypes.MAIN_PRODUCT_PAGE_REQUESTED);
    yield call(fetchMainProductPage);
  }
}

export function* watchAddFeedbackToProduct() {
  while (true) {
    const { payload } =  yield take(actionTypes.ADD_FEEDBACK_TO_PRODUCT_REQUESTED);
    yield call(addFeedbackToProduct, payload);
  }
}
