// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from 'src/redux/features/auth-slice'
import { firebaseCloudMessaging } from 'utils/firebase'

const Dashboard = () => {
  // ----------------------- Variables -----------------------
  const dispatch = useDispatch()

  // ----------------------- Variables -----------------------
  useEffect(() => {
    // Check if the window object is defined.
    if (typeof window !== 'undefined') {
      // Get the token from localStorage.
      const token = localStorage.getItem('token')
      dispatch(logIn(token))
    }
  }, [])

  const getFcm = () => {
    firebaseCloudMessaging()
      .then(token => {
        console.log('FCM token:', token)
      })
      .catch(error => {
        console.error('Error obtaining FCM token:', error)
      })
  }

  return (
    <ApexChartWrapper>
      <button className='fixed bottom-5 right-5' onClick={getFcm}>Get Fcm</button>
      <Grid container spacing={6}>
        {/* Statistics  */}
        <Grid item xs={12}>
          <StatisticsCard />
        </Grid>
        {/* Weekly overview */}
        <Grid item xs={12} md={6}>
          <WeeklyOverview />
        </Grid>
        {/* Total Earning */}
        <Grid item xs={12} md={6}>
          <TotalEarning />
        </Grid>

        {/* SalesByCountries */}

        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid> */}

        {/* Deposite and withdraw */}
        {/* <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}

        {/* users  */}
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
