import { IProduct } from "server/models/Product";
import * as actionTypes from "../actionTypes";

const initialState: ProductState = {
  products: [],
  pages: [],
};

const productReducer = (
  state: ProductState = initialState,
  action: StoreAction
): ProductState => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload.data),
        pages: state.pages,
      };
    case actionTypes.REMOVE_PRODUCT:
      const updatedProducts: IProduct[] = state.products.filter(
        (product) => product.id !== action.payload.data.id
      );
      return {
        ...state,
        products: updatedProducts,
        pages: state.pages,
      };
    case actionTypes.GET_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload.data),
        pages: state.pages,
      };
    case actionTypes.GET_FIRST_SET:
      return {
        ...state,
        products: state.products,
        pages: state.pages.concat([action.payload.data]),
      };
    case actionTypes.GET_PRODUCT_PAGE:
      return {
        ...state,
        products: state.products,
        pages: state.pages.concat([action.payload.data]),
      };
  }
  return state;
};

export default productReducer;
