import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}

export const contacts = createSlice({
  initialState,
  name: 'contacts',
  reducers: {
    setContacts: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setContacts } = contacts.actions

export default contacts.reducer
