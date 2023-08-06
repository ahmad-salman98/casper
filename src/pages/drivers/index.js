import React from 'react'
import { Grid } from '@mui/material'
import ViewDrivers from 'src/components/drivers/ViewDrivers'
import CreateDriver from 'src/components/drivers/CreateDriver'
import axios from 'axios'
import { setDrivers } from 'src/redux/features/driversSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Index() {
  // -------------------- Variables --------------------
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)

  // -------------------- Functions --------------------
  const getData = async () => {
    try {
      const { data } = await axios.get('http://192.168.0.154:8000/api/admin/driver/list', {
        headers: {
          Authorization: `Bearer + ${token}`
        }
      })
      dispatch(setDrivers(data.data.items))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) getData()
    console.log('🚀 ~ file: index.js:32 ~ Index ~ token:', token)
  }, [token])

  return (
    <Grid item xs={12}>
      <ViewDrivers />
      <CreateDriver />
    </Grid>
  )
}
