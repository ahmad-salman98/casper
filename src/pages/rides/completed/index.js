import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ViewCompletedRides from 'src/components/rides/ViewAllRides'
import { logIn } from 'src/redux/features/auth-slice'
import { setCompletedRides } from 'src/redux/features/rideSlice'

export default function CompletedRides() {
  // -------------------- Variables --------------------
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)

  // -------------------- Functions --------------------
  const getData = async () => {
    try {
      const { data } = await axios.get('http://192.168.0.154:8000/api/admin/ride/completed/list', {
        headers: {
          Authorization: `Bearer + ${token}`
        }
      })
      dispatch(setCompletedRides(data.data.items))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the token from localStorage.
      const token = localStorage.getItem('token')
      dispatch(logIn(token))
    }
  }, [])

  useEffect(() => {
    if (token) getData()
  }, [token])

  return (
    <div>
      <button onClick={() => console.log(token)}>Click</button>
      {<ViewCompletedRides source={'completed'} />}
    </div>
  )
}
