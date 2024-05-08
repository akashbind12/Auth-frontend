import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './auth/reducer'; // Import your authReducer

const middleware = [thunk];

// Combine the existing rootReducer with the authReducer
const rootReducer = combineReducers({
//   rootReducer, // Add other reducers here if needed
  auth: authReducer // Include the authReducer under the 'auth' key
});

const store = createStore(
  rootReducer, // Use the combinedReducers as the root reducer
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  console.log("Subscribe", store.getState());
});


export default store;
