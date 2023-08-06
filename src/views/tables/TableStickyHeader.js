// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import ViewDrivers from 'src/components/drivers/ViewDrivers'
import { useEffect } from 'react'
import ViewRide from 'src/components/rides/ViewRide'

const TableStickyHeader = ({ thead, data }) => {
  // -------------------------- States --------------------------
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [info, setInfo] = useState({})

  // -------------------------- Variables --------------------------
  const generalColumns = useSelector(state => state.tablesReducer.thead.general)
  const generalData = useSelector(state => state.tablesReducer.tbody.general)
  const columnsSource = thead || generalColumns
  const dataSource = data || generalData

  // -------------------------- Functions --------------------------

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    console.log(11111111, info)
  }, [info])

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // -------------------------- Components --------------------------
  const ViewBtn = ({ text, driver, ride, modalType }) => {
    return (
      <Button
        type='submit'
        size='small'
        variant='contained'
        onClick={() => {
          setInfo({ driver, ride, modalType })
          setShowModal(true)
        }}
      >
        <p className='text-white text-[11px] '> {text}</p>
      </Button>
    )
  }

  const ShowModal = () => {
    return (
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='flex justify-center items-center'
      >
        {info.modalType == 'Driver' ? <ViewDrivers driver={info?.driver} /> : <ViewRide ride={info?.ride} />}
      </Modal>
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <ShowModal />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columnsSource?.map(column => (
                <TableCell key={column} align={'left'} sx={{ minWidth: 150 }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* check if there is data to show */}
          {data[0] ? (
            <TableBody>
              {dataSource?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columnsSource?.map(column => {
                      const value = row[column.key]

                      // display date and time
                      if (column.label.includes('time')) {
                        return (
                          <TableCell key={column} align={'left'}>
                            {value && !isNaN(new Date(value)) ? new Date(value).toLocaleTimeString() : 'Not available'}
                          </TableCell>
                        )
                      } else
                        return (
                          <TableCell key={column} align={'left'}>
                            {/* check if a button should appear  */}
                            {column.viewModal ? (
                              <ViewBtn
                                text={`View ${column.label}`}
                                driver={row.driver}
                                ride={row.ride}
                                modalType={column.label}
                              />
                            ) : (
                              value || 'Not available'
                            )}
                          </TableCell>
                        )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          ) : (
            <TableBody className='displa w-[100vw] '>
              <TableCell colSpan={8} className='flex justify-center'>
                <div className='   w-full flex justify-center '>No data to show</div>
              </TableCell>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={dataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
