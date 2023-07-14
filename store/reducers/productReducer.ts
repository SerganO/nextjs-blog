import { IProduct } from "server/models/Product"
import * as actionTypes from "../actionTypes"

const initialState: ProductState = {
  products: [],
}

const productReducer = (
    state: ProductState = initialState,
    action: StoreAction
  ): ProductState => {
    switch (action.type) {
      case actionTypes.ADD_PRODUCT:
        const newProduct = action.payload.data
        return {
          ...state,
          products: state.products.concat(newProduct),
        }
      case actionTypes.REMOVE_PRODUCT:
        const updatedProducts: IProduct[] = state.products.filter(
            product => product.id !== action.payload.data.id
        )
        return {
          ...state,
          products: updatedProducts,
        }
        case actionTypes.GET_PRODUCT:
          const receivedProduct = action.payload.data
          return {
            ...state,
            products: state.products.concat(receivedProduct),
          }
    }
    return state
  }
  
  export default productReducer