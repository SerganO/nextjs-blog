import * as actionTypes from "../actionTypes";

type IdentityState = {};

const initialState: IdentityState = {};

const identityReducer = (
  state: IdentityState = initialState,
  action: StoreAction
): IdentityState => {
  switch (action.type) {
    case actionTypes.UPDATE_IDENTITY: {
      return {
        ...action.payload.data,
      };
    }
  }

  return state;
};

export default identityReducer;
