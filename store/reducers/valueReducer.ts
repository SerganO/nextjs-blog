import * as actionTypes from "../actionTypes";

const initialState: ValuesState = {
 
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
        [key]: value,
      };
    }
  }

  return state;
};

export default valueReducer;
