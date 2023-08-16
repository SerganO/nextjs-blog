import { call, all } from "redux-saga/effects";
import {
  watchFetchProduct,
  watchFetchProductPage,
  watchFetchMainProductPage,
  watchAddFeedbackToProduct,
} from "./productsSagas";
import { watchFetchUser } from "./usersSagas";
import container from "server/di/container";

/*
const entities = [
  container.resolve("UserEntity"),
  container.resolve("ProductEntity"),
  container.resolve("PageEntity"),
  container.resolve("MainPageInfoEntity"),
]

let functions = []
const sagas = [...entities]
  .map((item) => [...item.sagas()])
  
sagas.forEach(item => {
  item.forEach(func => {
    functions.concat(call(func))
  })
})


export default function* rootSaga() {
  yield all([...functions]);
}
*/


export default function* rootSaga() {
  yield all([
    call(watchFetchProduct),
    call(watchFetchProductPage),
    call(watchFetchMainProductPage),
    call(watchAddFeedbackToProduct),
    call(watchFetchUser),
  ]);
}


