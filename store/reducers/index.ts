import { combineReducers } from "redux"
import feedbackReducer from "./feedbackReducer"
import userReducer from "./userReducer"
import productReducer from "./productReducer"

const rootReducer = combineReducers({
    userReducer,
    productReducer,
    feedbackReducer
})

export default rootReducer