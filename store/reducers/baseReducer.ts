import * as actionTypes from "../actionTypes";

type StoreState = {

}

const initialState: StoreState = {
 
};

const baseReducer =
  (entityReducer: string) =>
  (
    state: StoreState = initialState,
    action: StoreAction
  ): StoreState => {
    switch (action.type) {
      case actionTypes.GET:
      case actionTypes.ADD:
      case actionTypes.UPDATE:
        if (action.payload) {
          const entitiesArr = action.payload.data.entities;
          let newValues: any = {};
          if (entitiesArr && entityReducer in entitiesArr) {
            const newData = entitiesArr[entityReducer];
            const newEntityValues = [
              state[entityReducer] ?? {},
              newData ?? {},
            ].reduce(function (r, o) {
              Object.keys(o).forEach(function (k) {
                r[k] = o[k];
              });
              return r;
            }, {});

            newValues[entityReducer] = newEntityValues;
          }

          return {
            ...state,
            ...newValues,
          };
        }
        break;
      case actionTypes.DELETE:
        if (action.payload) {
          const entitiesArr = action.payload.data.entities;
          if (entitiesArr && entityReducer in entitiesArr) {
            const dataForDelete = entitiesArr[entityReducer];
            const newValues = state[entityReducer] ?? {};

            Object.keys(dataForDelete).forEach((key) => {
              if (newValues.hasOwnProperty(key)) {
                delete newValues[key];
              }
            });

            return {
              ...state,
              [entityReducer]: newValues,
            };
          }
        }

        break;
    }
    return state;
  };

export default baseReducer;
