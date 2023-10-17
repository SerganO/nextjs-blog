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
  }

}
