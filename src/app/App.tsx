import { Layout } from 'antd'
import { Router } from './routes'
import { useGetProfileQuery } from '../shared/api/Auth/AuthRequest.ts'

const App = () => {
  const { data, isLoading, isError } = useGetProfileQuery({})

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      {!isLoading && (
        <Router
          role={data!.roles}
          isAuth={!isError}
        />
      )}
    </Layout>
  )
}

export default App
