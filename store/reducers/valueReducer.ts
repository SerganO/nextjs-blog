import * as actionTypes from "../actionTypes";

const initialState: ValuesState = {
  values: {},
};

const valueReducer = (
  state: ValuesState = initialState,
  action: StoreAction
): ValuesState => {
  switch (action.type) {
    case actionTypes.UPDATE_VALUE: {
      const key = action.payload.data.key;
      const value = action.payload.data.value;
      return {
        ...state,
        values: {
          ...state.values, [key]: value
        }
      }
    }
  }

  return state;
};

export default valueReducer;
