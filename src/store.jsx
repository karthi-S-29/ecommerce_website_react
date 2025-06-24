import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartslice'; // cartSlice is directly in src/

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
