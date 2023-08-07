import { Card, CardHeader, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from 'src/redux/features/auth-slice'
import { setContacts } from 'src/redux/features/contactsSlice'
import TableStickyContacts from 'src/components/contacts/TableStickyContacts'

export default function Index() {
  // -------------------------- States --------------------------
  const [filter, setFilter] = useState('')

  // -------------------------- Variables --------------------------

  const dispatch = useDispatch()
  const rows = useSelector(state => state.contactsReducer.data)
  const columns = useSelector(state => state.tablesReducer.thead.contacts)

  console.log('columns', columns)
  console.log('rows', rows)

  // -------------------- Functions --------------------
  const getData = async () => {
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios.get('http://192.168.0.154:8001/api/admin/message/list/2', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('messages', data.data.items)
      dispatch(setContacts(data.data.items))
    } catch (error) {
      console.log('errrrrrrror', error)
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the token from localStorage.
      const token = localStorage.getItem('token')
      console.log('token2', token)
      if (token) {
        dispatch(logIn(token))
        getData()
      }
    }
  }, [])

  return (
    <Grid item xs={12}>
      <Card>
        <div className='tableHeadWithFilter'>
          <CardHeader title='In-Contact Messages' titleTypographyProps={{ variant: 'h6' }} />
          <input
            type='number'
            className='search-input'
            placeholder='Filter by phone number'
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <TableStickyContacts data={rows} thead={columns} />
      </Card>
    </Grid>
  )
}
