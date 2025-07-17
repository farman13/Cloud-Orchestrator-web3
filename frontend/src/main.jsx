import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-g5l48dss0htraab2.us.auth0.com"
    clientId="FsjYeze4TJhOEFSc1CzfwnnVA9PKTVPR"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "authenticate api",
      scope: "openid profile email"
    }}>
    <App />
  </Auth0Provider>,
)


