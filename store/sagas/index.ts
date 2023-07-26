import { call, all } from 'redux-saga/effects';
import { watchFetchProduct, watchFetchProductPage, watchFetchMainProductPage,  watchAddFeedbackToProduct} from "./productsSagas"
import { watchFetchUser } from "./usersSagas";

export default function* rootSaga() {
  yield all([
    call(watchFetchProduct),
    call(watchFetchProductPage),
    call(watchFetchMainProductPage),
    call(watchAddFeedbackToProduct),
    call(watchFetchUser),
  ]);
}