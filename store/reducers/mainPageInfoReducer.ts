import * as actionTypes from "../actionTypes";

type MainPageInfoState = {
  info: MainPageInfo
};

const initialState: MainPageInfoState = {
  info: null
};

const entityReducer = "mainPageInfos";

const mainPageInfoReducer = (
  state: MainPageInfoState = initialState,
  action: StoreAction
): MainPageInfoState => {
  switch (action.type) {
    case actionTypes.GET:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer][0];
          
          return {
            ...state,
            info: newData
          };
        }
      }

      break;
    case actionTypes.ADD:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer][0];
          
          return {
            ...state,
            info: newData
          };
        }
      }

      break;
    case actionTypes.UPDATE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer][0];
          
          return {
            ...state,
            info: newData
          };
        }
      }
      break;
    case actionTypes.DELETE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          return {
            ...state,
           info: null
          };
        }
      }

      break;
  }
  return state;
};

export default mainPageInfoReducer;
