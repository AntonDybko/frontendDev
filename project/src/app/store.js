import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux';
import { createLogger, logger, createAsyncThunk } from 'redux-logger';
import thunk from 'redux-thunk';
//import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
//const middleware = [];
//middleware.push(createLogger());
//const enhancers = [...middleware]

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [logger, thunk],
  //enhancers: [composedEnhancer]
});
/*export const store = configureStore({
  counterReducer,
  applyMiddleware(logger),
})*/

