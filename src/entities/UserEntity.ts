import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";
import action from "./action";
import reducer from "./reducer";

@reducer("users")
export default class UserEntity extends Entity<UserEntity> {
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

  /*@action()
  public fetchUserInvokable(data, isSagaCall = false) {
    function* saga(data) {
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
    return this.invokableSaga(
      this.fetchUserInvokable.name,
      isSagaCall,
      saga,
      data
    );
  }*/
}
