import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import AccountTypePhoneNumber from './components/auth/AccountTypePhoneNumber.jsx'
import PersonalInfo from './components/auth/PersonalInfo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />,
        children: [
          {
            path: 'account_type_phone_number',
            element: <AccountTypePhoneNumber />
          },
          {
            path: 'personal_information',
            element: <PersonalInfo />
          },
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
