import React, { useEffect, useState } from 'react'
import { Card, CardHeader } from '@mui/material'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setCompletedRides } from 'src/redux/features/rideSlice'

export default function ViewCompletedRides({ source }) {
  // -------------------------- States --------------------------
  const [filter, setFilter] = useState('')

  // -------------------------- Variables --------------------------
  let rows = useSelector(state => state.ridesReducer[source].filter(item => item.end_point_name.includes(filter)))
  const columns = useSelector(state => state.tablesReducer.thead.rides)

  // -------------------------- Function --------------------------

  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Card sx={{ mb: 10 }}>
        <div className='tableHeadWithFilter'>
          <CardHeader title='Cars Table' titleTypographyProps={{ variant: 'h6' }} />
          <input
            type='text'
            className='search-input'
            placeholder='Filter by end location '
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        <TableStickyHeader data={rows} thead={columns} />
      </Card>
    </Card>
  )
}
