import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { applyMiddleware, createStore } from 'redux';
import { createLogger, logger } from 'redux-logger';
//import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

//const middleware = [];
//middleware.push(createLogger());
//const enhancers = [...middleware]

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [logger],
});
/*export const store = configureStore({
  counterReducer,
  applyMiddleware(logger),
})*/

