import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  completed: [],
  uncompleted: []
}

const rides = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    setRide: (state, action) => {
      state.data = action.payload
    },
    setCompletedRides: (state, action) => {
      state.completed = action.payload
    },
    setUnCompletedRides: (state, action) => {
      state.uncompleted = action.payload
    }
  }
})

export const { setCompletedRides, setUnCompletedRides, setRide } = rides.actions

export default rides.reducer
