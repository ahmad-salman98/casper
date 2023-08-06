import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateCar from 'src/components/cars/CreateCar'
import ViewCars from 'src/components/cars/ViewCars'
import { logIn } from 'src/redux/features/auth-slice'
import { setCars } from 'src/redux/features/carsSlice'

export default function Index() {
  // ---------------- States ----------------

  // ---------------- Variables ----------------
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const router = useRouter()

  // ---------------- Functions ----------------
  const getData = async () => {
    try {
      const { data } = await axios.get('http://192.168.0.154:8000/api/admin/cars/list', {
        headers: {
          Authorization: `Bearer + ${token}`
        }
      })
      dispatch(setCars(data.data.items))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the token from localStorage.
      const token = localStorage.getItem('token')
      if (token) {
        getData()
      } else {
        router.push('/pages/login')
      }
    }
  }, [])

  return (
    <div>
      <ViewCars />
      <CreateCar />
    </div>
  )
}
