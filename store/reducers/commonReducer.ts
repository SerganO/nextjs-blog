import * as actionTypes from "../actionTypes";

const initialState: StoreEntitiesState = {
  entities: {},
};

const commonReducer = (
  state: StoreEntitiesState = initialState,
  action: StoreAction
): StoreEntitiesState => {
  switch (action.type) {
    case actionTypes.GET:
    case actionTypes.ADD:
    case actionTypes.UPDATE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        let newValues: any = {};
        Object.keys(entitiesArr).forEach((entityReducer) => {
          if (entitiesArr && entityReducer in entitiesArr) {
            const newData = entitiesArr[entityReducer];
            const newEntityValues = [
              state.entities[entityReducer] ?? {},
              newData ?? {},
            ].reduce(function (r, o) {
              Object.keys(o).forEach(function (k) {
                r[k] = o[k];
              });
              return r;
            }, {});

            newValues[entityReducer] = newEntityValues;
          }
        });

        return {
          ...state,
          entities: {
            ...state.entities,
            ...newValues,
          },
        };
      }
      break;
    case actionTypes.DELETE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && action.entityReducer in entitiesArr) {
          const dataForDelete = entitiesArr[action.entityReducer];
          const newValues = state.entities[action.entityReducer] ?? {};

          Object.keys(dataForDelete).forEach((key) => {
            if (newValues.hasOwnProperty(key)) {
              delete newValues[key];
            }
          });

          return {
            ...state,
            entities: {
              ...state.entities,
              [action.entityReducer]: newValues,
            },
          };
        }
      }

      break;
  }
  return state;
};

export default commonReducer;
