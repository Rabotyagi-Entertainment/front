import { Layout } from 'antd'
import { useState } from 'react'
import { Startup } from './Startup'
import { AuthorizationForm } from './AuthorizationForm'

const Auth = () => {
  const [isOnboarding, setOnboarding] = useState<boolean>(false)
  // // @ts-ignore
  // const userName = window.Telegram.WebApp.initDataUnsafe.user.username

  const successAuthorizationCallback = () => {
    setOnboarding(true)
  }

  return (
    <>
      <Layout style={{ padding: '1rem' }}>
        {!isOnboarding ? <AuthorizationForm successCallback={successAuthorizationCallback} /> : <Startup />}
      </Layout>
    </>
  )
}

export default Auth
