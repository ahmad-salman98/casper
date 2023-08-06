import { createSlice } from '@reduxjs/toolkit'

const data = []

const initialState = {
  data
}

const cars = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setCars } = cars.actions

export default cars.reducer
