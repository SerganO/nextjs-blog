import { call, put, take } from "redux-saga/effects";
import { Entity } from "./entity";
import { schema } from "normalizr";
import * as actionTypes from "store/actionTypes";

export class UserEntity extends Entity {
  constructor(opts: any) {
    super(opts);
    this.initSchema("users",{},{});
    
    this.watchFetchUser = this.watchFetchUser.bind(this)
  }

  * fetchUser(action) {
    try {
      const id = parseInt(action.id);
      yield call(this.xRead, `/api/users/${id}`);
    } catch (error) {
      yield put({ type: actionTypes.USER_FETCH_FAILED, error });
    }
  }
  
  * watchFetchUser() {
    while (true) {
      const { payload } = yield take(actionTypes.USER_REQUESTED);
      yield put(
        actionTypes.action(actionTypes.SELECT_USER, {
          payload: { data: payload.id },
        })
      );
      yield call(this.fetchUser, payload);
    }
  }

  public sagas(): any[] {
    return [
      this.watchFetchUser
    ]
  }

}
