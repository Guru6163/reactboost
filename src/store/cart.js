const ADD_TO_CART = "ADD_TO_CART"



const addtoCartRedux = (payload) => ({
    type: ADD_TO_CART,
    payload
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
                    quantity: 1
                };
            }
            return newCart;
        }

        default:
            return state
    }
}
export { addtoCartRedux }
export default cartReducer