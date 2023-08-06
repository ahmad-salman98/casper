import React from 'react'
import { Card, CardHeader } from '@mui/material'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

export default function ViewDrivers({ driver }) {
  // -------------------------- Variables --------------------------
  const [filter, steFilter] = useState('')

  // -------------------------- Variables --------------------------
  let rows = useSelector(state => state.driversReducer.data.filter(item => item.mobile_number.includes(filter)))
  driver != null ? (rows = [driver]) : null

  const columns = useSelector(state => state.tablesReducer.thead.drivers)

  // -------------------------- Function --------------------------

  const handleFilter = e => {
    const { value } = e.target
    steFilter(value)
  }

  return (
    <Card>
      <div className='tableHeadWithFilter'>
        <CardHeader title={driver ? 'Driver info' : 'Drivers table'} titleTypographyProps={{ variant: 'h6' }} />
        {!driver && (
          <input type='number' className='search-input' placeholder='Filter by phone number' onChange={handleFilter} />
        )}
      </div>
      <TableStickyHeader data={rows} thead={columns} />
    </Card>
  )
}
