import { Card, CardHeader, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from 'src/redux/features/auth-slice'
import { setUsers } from 'src/redux/features/usersSlice'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

export default function Index() {
  // -------------------------- States --------------------------
  const [filter, setFilter] = useState('')

  // -------------------------- Variables --------------------------

  const dispatch = useDispatch()
  const rows = useSelector(state => state.usersReducer.data.filter(item => item.mobile_number.includes(filter)))
  const columns = useSelector(state => state.tablesReducer.thead.users)
  const token = useSelector(state => state.authReducer.token)

  // -------------------- Functions --------------------
  const getData = async () => {
    try {
      const { data } = await axios.get('http://192.168.0.154:8000/api/admin/user/list', {
        headers: {
          Authorization: `Bearer + ${token}`
        }
      })
      dispatch(setUsers(data.data.items))
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
    <Grid item xs={12}>
      <Card>
        <div className='tableHeadWithFilter'>
          <CardHeader title='Users Table' titleTypographyProps={{ variant: 'h6' }} />
          <input
            type='number'
            className='search-input'
            placeholder='Filter by phone number'
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <TableStickyHeader data={rows} thead={columns} />
      </Card>
    </Grid>
  )
}
