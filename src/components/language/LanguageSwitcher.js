import { useState } from 'react'
import { useRouter } from 'next/router'
import { IntlProvider } from 'next-intl'

const LanguageSwitcher = () => {
  const router = useRouter()
  const [locale, setLocale] = useState(router.locale || 'en')

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    setLocale(newLocale)
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <IntlProvider locale={locale} messages={require(`../../../locales/${locale}.json`)}>
      <div>
        <button onClick={toggleLocale}>{locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}</button>
      </div>
    </IntlProvider>
  )
}

export default LanguageSwitcher
