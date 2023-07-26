import { IUser } from "server/models/User";
import * as actionTypes from "../actionTypes";

const initialState: UserState = {
  users: [],
  selectedUser: -1,
};

const userReducer = (
  state: UserState = initialState,
  action: StoreAction
): UserState => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      const newUser = action.payload.data;
      return {
        ...state,
        users: state.users.concat(newUser),
      };
    case actionTypes.REMOVE_USER:
      const updatedUsers: IUser[] = state.users.filter(
        (user) => user.id !== action.payload.data.id
      );
      return {
        ...state,
        users: updatedUsers,
      };
    case actionTypes.GET_USER:
      const receivedUser = action.payload.data;
      return {
        ...state,
        users: state.users.concat(receivedUser),
      };
    case actionTypes.SELECT_USER:
      return {
        ...state,
        users: state.users,
        selectedUser: action.payload.data,
      };
    case actionTypes.USER_FETCH_SUCCEEDED:
      return {
        ...state,
        users: state.users.concat(action.payload.data),
        selectedUser: state.selectedUser,
      };
  }
  return state;
};

export default userReducer;
