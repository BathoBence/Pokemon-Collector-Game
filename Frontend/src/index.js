import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider  } from 'react-router-dom';
import Layout from './Components/Pages/Layout/Layout';
import WelcomePage from './Components/Pages/WelcomingPage';
import LoginPage from './Components/Pages/Login/LoginPage';
import RegistrationPage from './Components/Pages/Registration/RegistrationPage';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegistrationPage />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
