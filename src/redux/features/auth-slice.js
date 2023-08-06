const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  isAuth: false,
  token: '',
  fcm_token: ''
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.token = ''
      state.isAuth = false
    },
    logIn: (state, action) => {
      state.isAuth = true
      state.token = action.payload
    },
    setFcm: (state, action) => {
      state.fcm_token = action.payload
    }
  }
})

export const { logIn, logOut, setFcm } = auth.actions

export default auth.reducer
