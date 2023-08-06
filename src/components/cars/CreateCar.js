import { Card, CardHeader, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AxiosPost from '../axios/post'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'

export default function CreateCar() {
  // ---------------- States ----------------
  const [data, setData] = useState({})
  const [drivers, setDrivers] = useState([])

  // ---------------- Variables ----------------

  // ---------------- Functions ----------------
  const CreateCar = e => {
    const { id, value } = e.target
    setData({ ...data, [id]: value })
  }

  const getAvailableDrivers = async () => {
    try {
      const token = localStorage.getItem('token')

      const cars = await axios.get('http://192.168.0.154:8001/api/admin/driver/list/available', {
        headers: { Authorization: token }
      })

      setDrivers(cars.data.data.items)
      console.log('🚀 ~ file: CreateCar.js:28 ~ getAvailableDrivers ~ cars:', cars.data.data.items)
    } catch (error) {
      console.log(error)
    }
  }

  // ---------------- useEffects ----------------
  useEffect(() => {
    getAvailableDrivers()
  }, [])

  return (
    <Card sx={{ mt: 10 }}>
      <CardHeader title='Create new car' titleTypographyProps={{ variant: 'h6' }} />
      <form className='flex px-5 pb-10 gap-10 items-center'>
        <div className='flex gap-5 flex-wrap'>
          <TextField
            id='plate_number'
            label='Plate Number'
            variant='standard'
            onChange={CreateCar}
            value={data.plate_number}
          />
          <TextField id='color' type='text' value={data.color} label='Color' variant='standard' onChange={CreateCar} />
          <TextField id='charge' value={data.charge} label='Charge' variant='standard' onChange={CreateCar} />
          <TextField id='odometer' value={data.odometer} label='Odometer' variant='standard' onChange={CreateCar} />
          <TextField
            id='current_location'
            value={data.current_location}
            label='Current location'
            variant='standard'
            onChange={CreateCar}
          />
          <TextField id='user_id' value={data.user_id} label='User id' variant='standard' onChange={CreateCar} />

          <Button
            variant='outlined'
            type='button'
            className='border-2 shadow-sm rounded-md py-2 px-5 font-[500]'
            onClick={() => AxiosPost({ data, endPoint: 'http://192.168.0.154:8001/api/admin/cars/create' })}
          >
            Create Car
          </Button>
        </div>
      </form>
    </Card>
  )
}
