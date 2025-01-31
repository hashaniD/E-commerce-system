import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
  PLACE_ORDER,
  placeOrderSuccess,
  placeOrderFailure,
} from './actions';

// Saga to fetch products
function* fetchProducts() {
  try {
    const response = yield call(axios.get, 'http://localhost:5132/api/products');
    yield put(fetchProductsSuccess(response.data)); // Dispatch success action with fetched products
  } catch (error) {
    yield put(fetchProductsFailure(error.message)); // Dispatch failure action with error message
  }
}

// Saga to place an order
function* placeOrder(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5132/api/orders', action.payload);
    if (response.status === 200) {
      yield put(placeOrderSuccess()); // Dispatch success action
    } else {
      yield put(placeOrderFailure('Failed to place order')); // Dispatch failure action
    }
  } catch (error) {
    yield put(placeOrderFailure(error.message)); // Dispatch failure action with error message
  }
}

// Watcher saga
function* rootSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts);
  yield takeEvery(PLACE_ORDER, placeOrder);
}

export default rootSaga;
