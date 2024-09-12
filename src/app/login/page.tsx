import React from 'react'
import LoginForm from '@/components/LoginForm'
import { auth } from '@/auth'

async function LoginPage() {
  // const session = await auth();
  // console.log("session: ", session);
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage