import React from 'react'
import { confirmAdminLogin } from '@/lib/dal'
import LoginComp from './Login'

const LoginPage = async () => {
  await confirmAdminLogin()

  return (
    <LoginComp />
  )
}

export default LoginPage