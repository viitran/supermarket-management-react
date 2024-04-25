import { createSlice } from "@reduxjs/toolkit"

export const initialCartState = {
  cart: {
    size: 0
  }
}

export const cartSlice = createSlice({
  name: "common",
  initialState: initialCartState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload
    },
    setCartSize(state, action) {
      state.cart.size = action.payload
    }
  }
})

export const cartActions = cartSlice.actions

export const getCart = state => state.cart.cart

export const getCartSize = state => state.cart.cart.size

export default cartSlice.reducer
