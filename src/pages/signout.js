import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from 'src/redux/features/auth-slice'

export default function Signout() {
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    dispatch(logOut())
    localStorage.removeItem('token')
    router.push('/pages/login')
  }, [])

  return <div></div>
}
