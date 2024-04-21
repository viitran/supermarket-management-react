import { createSlice } from "@reduxjs/toolkit"

export const initialUserInfoState = {
  info: {
    userName: "",
    fullName: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    appRole: {
      roleName: ""
    }
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserInfoState,
  reducers: {
    setUserInfo(state, action) {
      state.info = action.payload
    }
  }
})

export const userActions = userSlice.actions

export const getUserInfo = state => state.user.info

export default userSlice.reducer
