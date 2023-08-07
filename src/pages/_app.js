// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { ReduxProvider } from 'src/redux/provider'
import { useEffect } from 'react'
import { firebaseCloudMessaging } from '../../utils/firebase'

// ** Translation package import
import { NextIntlProvider } from 'next-intl'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  useEffect(() => {
    // Check if we are on the client-side
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope)

            // Request notification permission
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Notification permission granted.')

                // Get FCM token and log it
                firebaseCloudMessaging()
                  .then(token => {
                    console.log('FCM token:', token)
                  })
                  .catch(error => {
                    console.error('Error obtaining FCM token:', error)
                  })
              } else {
                console.log('Notification permission denied.')
              }
            })
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error)
          })

        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', event => {
          const { type, notification } = event.data

          // Log the received notification data
          console.log('New notification:', notification)
        })
      })
    }
  }, [])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <ReduxProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <NextIntlProvider messages={pageProps.messages}>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </NextIntlProvider>
      </CacheProvider>
    </ReduxProvider>
  )
}

export default App
