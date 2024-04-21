import { createSlice } from "@reduxjs/toolkit"

export const initialCommonState = {
  search: {
    navBar: ""
  }
}

export const commnSlice = createSlice({
  name: "common",
  initialState: initialCommonState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload
    }
  }
})

export const commonActions = commnSlice.actions

export const getSearch = state => state.common.search

export default commnSlice.reducer
