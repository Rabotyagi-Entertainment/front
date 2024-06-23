import { Layout } from 'antd'
import { Router } from './routes'
import { useLocation } from 'react-router-dom'
import { RolesEnum } from '../shared/types/user/RolesEnum.ts'

const App = () => {
  const { pathname } = useLocation()

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Router role={pathname.includes('/admin') ? RolesEnum.ADMIN : RolesEnum.USER} />
    </Layout>
  )
}

export default App
