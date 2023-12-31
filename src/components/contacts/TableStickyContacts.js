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
import { Menu, MenuItem, Select } from '@mui/material'
import axios from 'axios'

const TableStickyContacts = ({ thead, data }) => {
  // -------------------------- States --------------------------
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [info, setInfo] = useState({})
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null) // Initialize anchorEl state to null

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

  const handleStatusChange = async (statusValue, rowId) => {
    console.log('statusValue', statusValue, 'rowId', rowId)
    try {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://casper.ezcredit.com.kw/api/ffadmin/message/${rowId}/${statusValue}`,
        headers: {
          Authorization:
            'Bearer Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDEvYXBpL2F1dGgvdmVyaWZ5IiwiaWF0IjoxNjkxMjQ0NTA3LCJleHAiOjE3MjI3ODA1MDcsIm5iZiI6MTY5MTI0NDUwNywianRpIjoiQXFicjNORklyRUVybGtMViIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FsElNkll0JY0nSmYjXJHBKElWkSCZ2eXGwu6WTJIPZs'
        }
      }

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.log(error)
        })

      setStatusDropdownOpen(false)
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  const getStatusLabel = statusValue => {
    switch (statusValue) {
      case '1':
        return 'Pending'
      case '2':
        return 'In Contact'
      case '3':
        return 'Completed'
      default:
        return 'Unknown'
    }
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

  const StatusButton = ({ statusValue, rowId }) => {
    const handleStatusClick = event => {
      // Open the dropdown
      setStatusDropdownOpen(true)
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      // Close the dropdown
      setStatusDropdownOpen(false)
    }

    return (
      <>
        <select
          labelId='demo-simple-select-label'
          aria-label='Status'
          id='demo-simple-select'
          label={getStatusLabel(statusValue)}
          onChange={handleStatusChange}
        >
          <option onClick={() => handleStatusChange('1', rowId)}>{getStatusLabel('1')}</option>
          <option onClick={() => handleStatusChange('2', rowId)}>{getStatusLabel('2')}</option>
          <option onClick={() => handleStatusChange('3', rowId)}>{getStatusLabel('3')}</option>
        </select>
      </>
    )
  }

  // -------------------------- Render --------------------------

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
              <TableCell key={'status'} align={'left'} sx={{ minWidth: 150 }}>
                Status
              </TableCell>
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
                      } else if (column.key === 'status_value') {
                        // Render the status select in the status column
                        return (
                          <TableCell key={column} align={'left'}>
                            <select
                              labelId='demo-simple-select-label'
                              aria-label='Status'
                              id='demo-simple-select'
                              value={row.status_value}
                              onChange={e => handleStatusChange(e.target.value, row.id)}
                            >
                              <option value='1'>Pending</option>
                              <option value='2'>In Contact</option>
                              <option value='3'>Completed</option>
                            </select>
                          </TableCell>
                        )
                      } else {
                        // Render other cells
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
                      }
                    })}

                    <TableCell align='left'>
                      {/* Render the status buttons for each row */}
                      <StatusButton statusValue={row.status_value} rowId={row.id} />
                    </TableCell>
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

export default TableStickyContacts
