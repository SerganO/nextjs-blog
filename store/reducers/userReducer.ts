import { IUser } from "server/models/User";
import * as actionTypes from "../actionTypes";

type UserStateNew = {
  users: IUser[]
}

const initialState: UserStateNew = {
  users: [],
};

/*const initialState: UserState = {
  users: [],
  selectedUser: -1,
};*/

/*const userReducer = (
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
    //case actionTypes.GET_USER:
    //  const receivedUser = action.payload.data;
    //  return {
    //    ...state,
    //    users: state.users.concat(receivedUser),
    //  };
    case actionTypes.SELECT_USER:
      return {
        ...state,
       // users: state.users,
        selectedUser: action.payload.data,
      };
    case actionTypes.USER_FETCH_SUCCEEDED:
      return {
        ...state,
        users: state.users.concat(action.payload.data),
        //selectedUser: state.selectedUser,
      };
  }
  return state;
};*/

const entityReducer = "users";
const userReducer = (
  state: UserStateNew = initialState,
  action: StoreAction
): UserStateNew => {
  switch (action.type) {
    case actionTypes.GET:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          
          const ids = new Set(Object.keys(newData));
          const newDataArr = Object.keys(newData).map(
            id => {
              return newData[id]
            }
          )
          return {
            ...state,
            users: state.users.filter((d) => !ids.has(d.id.toString())).concat(newDataArr)
          };
        }
      }

      break;
    case actionTypes.ADD:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          
          const ids = new Set(Object.keys(newData));
          const newDataArr = Object.keys(newData).map(
            id => {
              return newData[id]
            }
          )
          return {
            ...state,
            users: state.users.filter((d) => !ids.has(d.id.toString())).concat(newDataArr)
          };
        }
      }

      break;
    case actionTypes.UPDATE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          
          const ids = new Set(Object.keys(newData));
          const newDataArr = Object.keys(newData).map(
            id => {
              return newData[id]
            }
          )
          return {
            ...state,
            users: state.users.filter((d) => !ids.has(d.id.toString())).concat(newDataArr)
          };
        }
      }
      break;
    case actionTypes.DELETE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          const ids = new Set(Object.keys(newData));
          return {
            ...state,
            users: state.users.filter((d) => !ids.has(d.id.toString()))
          };
        }
      }

      break;
  }
  return state;
};

export default userReducer;
