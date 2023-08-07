import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import usersReducer from './features/usersSlice'
import tablesReducer from './features/tablesData'
import driversReducer from './features/driversSlice'
import carsReducer from './features/carsSlice'
import ridesReducer from './features/rideSlice'
import contactsReducer from './features/contactsSlice'

export const store = configureStore({
  reducer: {
    authReducer,
    usersReducer,
    tablesReducer,
    driversReducer,
    carsReducer,
    ridesReducer,
    contactsReducer
  }
})
