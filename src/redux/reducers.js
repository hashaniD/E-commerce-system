import { combineReducers } from 'redux';
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
} from './actions';

// Reducer for products
const productsReducer = (state = { products: [], error: null }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Reducer for cart
const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_CART:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Reducer for orders
const ordersReducer = (state = { success: false, error: null }, action) => {
  switch (action.type) {
    case PLACE_ORDER_SUCCESS:
      return { ...state, success: true };
    case PLACE_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
