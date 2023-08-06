import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}

export const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setUsers } = users.actions

export default users.reducer
