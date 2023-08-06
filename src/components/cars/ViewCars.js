import React from 'react'
import { Card, CardHeader } from '@mui/material'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function ViewDrivers() {
  // -------------------------- States --------------------------
  const [filter, setFilter] = useState('')

  // -------------------------- Variables --------------------------
  let rows = useSelector(state => state.carsReducer.data.filter(item => item.plate_number.includes(filter)))
  const columns = useSelector(state => state.tablesReducer.thead.cars)

  // -------------------------- Function --------------------------

  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Card sx={{ mb: 10 }}>
        <div className='tableHeadWithFilter'>
          <CardHeader title='Cars Table' titleTypographyProps={{ variant: 'h6' }} />
          <input
            type='number'
            className='search-input'
            placeholder='Filter by plate number '
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        <TableStickyHeader data={rows} thead={columns} />
      </Card>
    </Card>
  )
}
