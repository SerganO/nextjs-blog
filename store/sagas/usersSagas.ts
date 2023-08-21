import { take, call, put } from "redux-saga/effects";

import { _xfetch, user } from "src/functions/xfetch";
import * as actionTypes from "../actionTypes";

function* fetchUser(action) {
  try {
    const id = parseInt(action.id);
    const data = yield call(_xfetch, `/api/users/${id}`, user);
    //yield put({ type: actionTypes.USER_FETCH_SUCCEEDED, payload: { data } });
    yield put({ type: actionTypes.ADD, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.USER_FETCH_FAILED, error });
  }
}

export function* watchFetchUser() {
  while (true) {
    const { payload } = yield take(actionTypes.USER_REQUESTED);
    yield put(
      actionTypes.action(actionTypes.SELECT_USER, {
        payload: { data: payload.id },
      })
    );
    yield call(fetchUser, payload);
  }
}
