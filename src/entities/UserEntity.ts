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
    yield call(this.xRead, `/api/users/${id}`);
  }
}
