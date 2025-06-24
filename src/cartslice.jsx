import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartCount: 0
  },
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    incrementCart: (state) => {
      state.cartCount += 1;
    },
    decrementCart: (state) => {
      state.cartCount = Math.max(0, state.cartCount - 1);
    }
  }
});

export const { setCartCount, incrementCart, decrementCart } = cartSlice.actions;
export default cartSlice.reducer;
