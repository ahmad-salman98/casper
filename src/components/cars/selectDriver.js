import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRide } from 'src/redux/features/rideSlice'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

export default function ViewRide({ ride }) {
  // -------------------------- Variables --------------------------

  const dispatch = useDispatch()

  let rows = useSelector(state => state.ridesReducer.data)

  const columns = useSelector(state => state.tablesReducer.thead.rides)

  useEffect(() => {
    // Only dispatch the setRide action when the ride prop changes
    if (ride !== rows[0]) {
      dispatch(setRide([ride]))
    }
  }, [ride])

  return (
    <>
      <TableStickyHeader data={rows} thead={columns} />)
    </>
  )
}
