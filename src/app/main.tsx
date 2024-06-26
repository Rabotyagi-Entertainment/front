import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ConfigProvider } from 'antd'
import { getTheme } from './theme/gettheme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ConfigProvider theme={getTheme()}>
          <App />
        </ConfigProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
)
