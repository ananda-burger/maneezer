import React from 'react'
import ReactDOM from 'react-dom'
import App from 'view/App'
import { store } from 'app/store'
import { Provider } from 'react-redux'
import { LoginResponse } from 'types'

declare global {
  interface Window {
    DZ: {
      init: (config: { appId: string; channelUrl: string }) => void
      api: (...args: any) => void
      getLoginStatus: (callback: (response: LoginResponse) => void) => void
      logout: () => void
      login: (
        callback: (response: LoginResponse) => void,
        permissions: { perms: string }
      ) => void
    }
  }
}

// For local development, use app ID 499022 and channel URL as
// http://localhost:3000.
window.DZ.init({
  appId: '499722',
  channelUrl: 'https://maneezer.netlify.com'
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
