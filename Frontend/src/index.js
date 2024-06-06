import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Pokedex from './Components/Pages/Pokedex/Pokedex';
import LoginPage from './Components/Pages/Login/LoginPage';
import RegistrationPage from './Components/Pages/Registration/RegistrationPage';
import Layout from './Components/Pages/Layout/Layout';
import Inventory from './Components/Pages/Inventory/Inventory';
import EvolveCenter from './Components/Pages/EvolveCenter/EvolveCenter';
import Shop from './Components/Pages/Shop/Shop';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      path: '/register',
      element: <RegistrationPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    }]
  },
  {
    path: '/main',
    element: <NavBar />,
    children: [{
      path: '/main/:userId',
      element: <Home />
    },
    {
      path: '/main/pokedex/:userId',
      element: <Pokedex />
    },
    {
      path: '/main/inventory/:userId',
      element: <Inventory />
    },
    {
      path: '/main/evolve/:userId',
      element: <EvolveCenter />
    },
    {
      path: '/main/shop/:userId',
      element: <Shop />
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
