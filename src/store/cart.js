const ADD_TO_CART = "ADD_TO_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const CLEAR_CART = "CLEAR_CART"



const addtoCartRedux = (payload) => ({
    type: ADD_TO_CART,
    payload
})
const removeFromCartRedux = (payload) => ({
    type: REMOVE_FROM_CART,
    payload
})
const clearCartRedux = () => ({
    type: CLEAR_CART,

})
const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TO_CART: {
            const newCart = { ...state };
            // my item is already present
            if (state[action.payload.id]) {
                const newProduct = { ...state[action.payload.id] };
                newProduct.quantity = newProduct.quantity + 1;
                newCart[action.payload.id] = newProduct;
            } else {

                // my item is not present
                newCart[action.payload.id] = {
                    id: action.payload.id,
                    title: action.payload.title,
                    quantity: 1
                };
            }
            return newCart;
        }
        case CLEAR_CART:
            console.log("Clear")
            return {

            }

        default:
            return state
    }
}



export { addtoCartRedux, removeFromCartRedux,clearCartRedux }
export default cartReducer