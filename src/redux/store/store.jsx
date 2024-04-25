import { configureStore } from "@reduxjs/toolkit";
import userSlice from './../slide/user-slice';
import commnSlice from './../slide/common-slice';
import cartSlice from './../slide/cart-slice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    common: commnSlice,
  },
});
