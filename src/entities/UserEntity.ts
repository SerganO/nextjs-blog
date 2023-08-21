import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./action";

export default class UserEntity extends Entity {
  constructor(opts: any) {
    super(opts);
    this.initSchema("users", {}, {});
  }

  @action()
  public *fetchUser(data) {
    const id = parseInt(data.id);
    yield call(this.xRead, `/users/${id}`);
    yield put(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        
        payload: { data: {
          key: "SELECTED_USER",
          value: id
        } },
      }
    )
    );
  }
}
