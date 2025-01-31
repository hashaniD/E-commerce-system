import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Import rootReducer
import rootSaga from './sagas'; // Import rootSaga

// Initialize the Redux-Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Redux store with the rootReducer and applySagaMiddleware
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
