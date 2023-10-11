import { call, put } from "redux-saga/effects";
import { BaseEntity, HTTP_METHOD } from "./BaseEntity";
import * as actionTypes from "store/actionTypes";
import action from "./decorators/action";
import reducer from "./decorators/reducer";

@reducer("users")
export default class UserEntity extends BaseEntity<UserEntity> {
  constructor(opts: any) {
    super(opts);
    this.initSchema("users", {}, {});
  }

  @action()
  public *setCurrentUser(data) {
    const id = parseInt(data.id);
    yield put(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        payload: {
          data: {
            key: "SELECTED_USER",
            value: id,
          },
        },
      })
    );
  }

  @action()
  public *fetchUser(data) {
    const id = parseInt(data.id);
    yield call(this.xRead, `/users/${id}`);
    yield put(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        payload: {
          data: {
            key: "SELECTED_USER",
            value: id,
          },
        },
      })
    );
  }

  @action()
  public *login(data) {
    const resData = yield call (this.xRead, `/login`, { email: data.email, password: data.password }, HTTP_METHOD.POST)
    yield put(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        payload: {
          data: {
            key: "LOGGED_USER",
            value: resData.response.data.id,
          },
        },
      })
    );
  }

  @action()
  public *register(data) {
    yield call (this.xSave, `/users/add`, data)
  }

  @action()
  public *logout() {
  yield call (this.xRead, `/logout`, {}, HTTP_METHOD.POST)
    yield put(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        payload: {
          data: {
            key: "LOGGED_USER",
            value: null,
          },
        },
      })
    );
  }
}
