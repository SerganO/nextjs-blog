import * as actionTypes from "../actionTypes";

const initialState: ValuesState = {
  selectedProductId: -1,
  selectedPage: -1,
  selectedUser: -1,
};

const reducer = (
  state: ValuesState = initialState,
  action: StoreAction
): ValuesState => {
  switch (action.type) {
    case actionTypes.SELECT_PAGE:
      return {
        ...state,
        selectedPage: action.payload.data,
      };
    case actionTypes.SELECT_PRODUCT_ID:
      return {
        ...state,
        selectedProductId: action.payload.data,
      };
    case actionTypes.SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload.data,
      };
  }

  return state;
};

export default reducer;

/*case IMethod.UPDATE:
                  if (action.response) {
                      const entitiesArr = action.response.entities;
  
                      if (entitiesArr && entityReducer in entitiesArr) {
                          if (state && state.size > 0) {
                              Object.keys(entitiesArr[entityReducer]).map(id => {
                                  state = state.remove(id)
  ;
                              });
                          }
                          state = state.mergeDeep(
                              fromJS(entitiesArr[entityReducer]),
                          );
                      }
                      break;
                  }
  */
