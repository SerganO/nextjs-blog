import { take, call, put } from "redux-saga/effects";

import { _xfetch, feedback, mainPageInfo, page, product } from "functions/xfetch";
import * as actionTypes from "../actionTypes";

function* fetchProduct(action) {
  try {
    const id = parseInt(action.id);
    const data = yield call(_xfetch, `/api/products/${id}/extended`, product);
    yield put({ type: actionTypes.PRODUCT_FETCH_SUCCEEDED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.PRODUCT_FETCH_FAILED, error });
  }
}

function* fetchProductNew(action) {
  try {
    const id = parseInt(action.id);
    const data = yield call(_xfetch, `/api/products/${id}/extended`, product);
    yield put({ type: actionTypes.ADD, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.PRODUCT_FETCH_FAILED, error });
  }
}

function* fetchProductPage(action) {
  try {
    const data = yield call(
      _xfetch,
      `/api/products/pagination?page=${action.page}${action.userString}`, page
    );
    /*yield put({
      type: actionTypes.PRODUCT_PAGE_FETCH_SUCCEEDED,
      payload: { data },
    });*/
    yield put({ type: actionTypes.ADD, payload: { data } });
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
      `/api/products/feedbacksIncluded/firstSet`, mainPageInfo
    );
    yield put({
      type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_SUCCEEDED,
      payload: { data: { products: data }},
    });
  } catch (error) {
    yield put({ type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_FAILED, error });
  }
}

function* fetchMainProductPageNew() {
  try {
    const data = yield call(
      _xfetch,
      `/api/products/feedbacksIncluded/firstSet`, mainPageInfo
    );
    /*yield put({
      type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_SUCCEEDED,
      payload: { data: { products: data }},
    });*/
    yield put({ type: actionTypes.ADD, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.MAIN_PRODUCT_PAGE_FETCH_FAILED, error });
  }
}


function* addFeedbackToProduct(action) {
  try {
    const feedbackData = action.feedbackData;
    const data = yield call(_xfetch, `/api/products/${feedbackData.product_id}/addFeedback`,product,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });
    //yield put({ type: actionTypes.ADD_FEEDBACK_TO_PRODUCT_SUCCEEDED, payload: { data } });
    yield put({ type: actionTypes.UPDATE, payload: { data } });
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
    yield call(fetchProductNew, payload);
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
    yield call(fetchMainProductPageNew);
  }
}

export function* watchAddFeedbackToProduct() {
  while (true) {
    const { payload } =  yield take(actionTypes.ADD_FEEDBACK_TO_PRODUCT_REQUESTED);
    yield call(addFeedbackToProduct, payload);
  }
}
