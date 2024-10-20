
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Started from './components/Started.jsx'
import AccountBalance from './components/AccountBalance.jsx'
import GetCurrencies from './components/GetCurrencies.jsx'
import GetTokenHolders from './components/GetTokenHolders.jsx'
import GetTokenTransfer from './components/GetTokenTransfer.jsx'
import GetTokenPrize from './components/GetTokenPrize.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<Home/>}/>
    <Route path='/started' element={<Started/>}/>
    <Route path='/account-balance' element={<AccountBalance/>}/>
    <Route path='/currencies' element={<GetCurrencies/>}/>
    <Route path='/tokenholders' element={<GetTokenHolders/>}/>
    <Route path='/tokentransfer' element={<GetTokenTransfer/>}/>
    <Route path='/tokenprize' element={<GetTokenPrize/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

   <Navbar/>
   <RouterProvider router={router}/>

  </React.StrictMode>,
)
