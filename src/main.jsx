import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { Estore } from './Redux-Toolkit/Store.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './Pages/Home.jsx'
import {SingleProduct} from './Pages/SingleProduct.jsx'
import { Cart } from './Pages/Cart.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/shop/:id',
        element: <SingleProduct />
      },
      {
        path: '/card',
        element: <Cart />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-5o3e3j5mxyzqupmo.us.auth0.com"
    clientId="8xAUF1cCNSSboB7hpH1jtAekZYLO67W5"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <Provider store={Estore}>
    <RouterProvider router={router} />
  </Provider>
  </Auth0Provider>
)
