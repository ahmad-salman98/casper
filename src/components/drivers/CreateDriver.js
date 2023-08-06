import { Card, CardHeader, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AxiosPost from '../axios/post'

export default function CreateDriver() {
  // ---------------- States ----------------
  const [data, setData] = useState({})

  // ---------------- Functions ----------------
  const createDriver = e => {
    const { id, value } = e.target
    setData({ ...data, [id]: value })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Card sx={{ mt: 10 }}>
      <CardHeader title='Create new driver' titleTypographyProps={{ variant: 'h6' }} />
      <form className='flex px-5 pb-10 gap-10 items-center'>
        <div className='flex gap-5'>
          <TextField
            id='full_name'
            label='Full Name'
            variant='standard'
            onChange={createDriver}
            value={data.full_name}
          />

          <TextField
            id='mobile_number'
            type='text'
            value={data.mobile_number}
            label='Mobile Number'
            variant='standard'
            onChange={createDriver}
          />

          <TextField
            id='email'
            value={data.email}
            label='Email'
            type='email'
            variant='standard'
            onChange={createDriver}
          />
        </div>
        <button
          type='button'
          className='border-2 shadow-sm rounded-md py-2 px-5 font-[500]'
          onClick={() => AxiosPost({ data, endPoint: 'http://192.168.0.154:8000/api/admin/driver/create' })}
        >
          Create Driver
        </button>
      </form>
    </Card>
  )
}
