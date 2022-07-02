const initialState = {
    isLoading: false,
    loadError: null,
    data: []
};

const FETCH_PRODUCT_LIST_INIT = "FETCH_PRODUCT_LIST_INIT";
const FETCH_PRODUCT_LIST_DONE = "FETCH_PRODUCT_LIST_DONE";
const FETCH_PRODUCT_LIST_ERROR = "FETCH_PRODUCT_LIST_ERROR";

const fetchProductListDone = (productList) => ({
    type: FETCH_PRODUCT_LIST_DONE,
    payload: productList
});

const fetchProductListError = (error) => ({
    type: FETCH_PRODUCT_LIST_ERROR,
    payload: error
});

const fetchProductListInit = () => ({
    type: FETCH_PRODUCT_LIST_INIT
});

const loadProductList = (categoryName) => {
    return async (dispatch, getState) => {
        const { isLoading } = getState().productList;

        if (isLoading) return;

        dispatch(fetchProductListInit());

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/${categoryName}`
            );
            const json = await response.json();
            dispatch(fetchProductListDone(json));
        } catch (e) {
            dispatch(fetchProductListError(e));
        }
    };
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_LIST_INIT: {
            return {
                ...state,
                isLoading: true,
                loadError: null,
                data: []
            };
        }
        case FETCH_PRODUCT_LIST_DONE: {
            return {
                ...state,
                isLoading: false,
                loadError: null,
                data: action.payload
            };
        }
        case FETCH_PRODUCT_LIST_ERROR: {
            return {
                ...state,
                isLoading: false,
                loadError: action.payload,
                data: []
            };
        }
        default:
            return state;
    }
};

export { loadProductList };

export default productReducer;
