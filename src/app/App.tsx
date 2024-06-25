import { Layout } from 'antd'
import { Router } from './routes'

const App = () => {
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Router />
    </Layout>
  )
}

export default App
