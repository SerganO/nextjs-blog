import { IUser } from "server/models/User"
import * as actionTypes from "../actionTypes"

const initialState: UserState = {
  users: [],
}

const userReducer = (
    state: UserState = initialState,
    action: StoreAction
  ): UserState => {
    switch (action.type) {
      case actionTypes.ADD_USER:
        const newUser = action.payload.data
        return {
          ...state,
          users: state.users.concat(newUser),
        }
      case actionTypes.REMOVE_USER:
        const updatedUsers: IUser[] = state.users.filter(
            user => user.id !== action.payload.data.id
        )
        return {
          ...state,
          users: updatedUsers,
        }
    }
    return state
  }
  
  export default userReducer