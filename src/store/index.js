import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import cartReducer from "./cart"
import productReducer from "./productList"

const reducers = combineReducers({
    cart: cartReducer,
    productList: productReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store   