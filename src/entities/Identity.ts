import { call, put } from "redux-saga/effects";
import { BaseEntity, HTTP_METHOD } from "./BaseEntity";
import * as actionTypes from "store/actionTypes";
import action from "./decorators/action";
import reducer from "./decorators/reducer";

export default class Identity extends BaseEntity<Identity> {
  constructor(opts: any) {
    super(opts);
    this.initSchema("identity", {}, {});
  }

  @action()
  public *login(data) {
    const resData = yield call(
      this.xRead,
      `/login`,
      { email: data.email, password: data.password },
      HTTP_METHOD.POST
    );
    yield put(
        actionTypes.action(actionTypes.UPDATE_IDENTITY, {
          payload: {
            data: resData.response.data,
          },
        })
      );
  }

  @action()
  public *register(data) {
    const resData = yield call(this.xSave, `/register`, data);
    yield put(
        actionTypes.action(actionTypes.UPDATE_IDENTITY, {
          payload: {
            data: resData.response.data,
          },
        })
      );
  }

  @action()
  public *logout() {
    const resData = yield call(this.xRead, `/logout`, {}, HTTP_METHOD.POST);
    yield put(
        actionTypes.action(actionTypes.UPDATE_IDENTITY, {
          payload: {
            data: resData.response.data,
          },
        })
      );
  }

  @action()
  public *getIdentity() {
    const resData = yield call(this.xRead, `/getIdentity`);
    yield put(
        actionTypes.action(actionTypes.UPDATE_IDENTITY, {
          payload: {
            data: resData.response.data,
          },
        })
      );
  }

}
