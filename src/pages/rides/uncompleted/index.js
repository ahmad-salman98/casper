import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ViewUnCompletedRides from 'src/components/rides/ViewAllRides'
import { logIn } from 'src/redux/features/auth-slice'
import { setUnCompletedRides } from 'src/redux/features/rideSlice'

export default function UnCompletedRides() {
  // -------------------- Variables --------------------
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)

    // -------------------- Functions --------------------
  const getData = async () => {
    try {
      const { data } = await axios.get('http://192.168.0.154:8000/api/admin/ride/uncompleted/list', {
        headers: {
          Authorization: `Bearer + ${token}`
        }
      })
      dispatch(setUnCompletedRides(data.data.items))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // Check if the window object is defined.
    if (typeof window !== 'undefined') {
      // Get the token from localStorage.
      const token = localStorage.getItem('token')
      console.log('🚀 ~ file: index.js:33 ~ useEffect ~ token:', token)
      dispatch(logIn(token))
    }
  }, [])

  useEffect(() => {
    if (token) getData()
  }, [token])

  return <div>{<ViewUnCompletedRides source={'uncompleted'} />}</div>
}
