import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/gamesSlice';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [logger, thunk],

});


