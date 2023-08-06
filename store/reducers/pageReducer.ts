import * as actionTypes from "../actionTypes";

type PageState = {
  pages: IPage[];
};

const initialState: PageState = {
  pages: [],
};

const entityReducer = "pages";

const pageReducer = (
  state: PageState = initialState,
  action: StoreAction
): PageState => {
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
            pages: state.pages.filter((d) => !ids.has(d.page.toString())).concat(newDataArr)
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
            pages: state.pages.filter((d) => !ids.has(d.page.toString())).concat(newDataArr)
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
            pages: state.pages.filter((d) => !ids.has(d.page.toString())).concat(newDataArr)
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
            pages: state.pages.filter((d) => !ids.has(d.page.toString()))
          };
        }
      }

      break;
  }
  return state;
};

export default pageReducer;
