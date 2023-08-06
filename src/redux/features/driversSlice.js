import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}

const drivers = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setDrivers } = drivers.actions

export default drivers.reducer
