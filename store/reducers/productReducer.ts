import { IProduct } from "server/models/Product";
import * as actionTypes from "../actionTypes";

const initialState: ProductState = {
  mainPageInfo: {
    products: [],
  },
  products: [],
  pages: [],
  selectedProductId: -1,
  selectedPage: -1,
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
      return {
        ...state,
        products: state.products,
        pages: state.pages.concat([action.payload.data]),
      };
    case actionTypes.PRODUCT_FETCH_SUCCEEDED:
      return {
        ...state,
        products: state.products.concat(action.payload.data),
        pages: state.pages,
        selectedPage: state.selectedPage,
        selectedProductId: state.selectedProductId,
        mainPageInfo: state.mainPageInfo,
      };
    case actionTypes.ADD_FEEDBACK_TO_PRODUCT_SUCCEEDED:
      return {
        ...state,
        products: state.products.concat(action.payload.data),
        pages: state.pages,
        selectedPage: state.selectedPage,
        selectedProductId: state.selectedProductId,
        mainPageInfo: state.mainPageInfo,
      };
    case actionTypes.PRODUCT_PAGE_FETCH_SUCCEEDED:
      return {
        ...state,
        products: state.products,
        pages: state.pages.concat([action.payload.data]),
        selectedPage: state.selectedPage,
        selectedProductId: state.selectedProductId,
        mainPageInfo: state.mainPageInfo,
      };
    case actionTypes.SELECT_PAGE:
      return {
        ...state,
        products: state.products,
        pages: state.pages,
        selectedPage: action.payload.data,
        selectedProductId: state.selectedProductId,
        mainPageInfo: state.mainPageInfo,
      };
    case actionTypes.SELECT_PRODUCT_ID:
      return {
        ...state,
        products: state.products,
        pages: state.pages,
        selectedPage: state.selectedPage,
        selectedProductId: action.payload.data,
        mainPageInfo: state.mainPageInfo,
      };
    case actionTypes.MAIN_PRODUCT_PAGE_FETCH_SUCCEEDED:
      return {
        ...state,
        products: state.products,
        pages: state.pages,
        selectedPage: state.selectedPage,
        selectedProductId: state.selectedProductId,
        mainPageInfo: action.payload.data,
      };
  }
  return state;
};

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
export default productReducer;
