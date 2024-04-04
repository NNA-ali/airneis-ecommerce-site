import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreFooter from './views/auth/Base/StoreFooter'
import StoreHeader from './views/auth/Base/StoreHeader'
import MainWrapper from './layout/MainWrapper'
import Products from './views/store/Products'
import ProductDetail from './views/store/ProductDetail'


function App() {

  return (
    <BrowserRouter>
    <StoreHeader />
    
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/create-new-password' element={<CreatePassword/>} />
        
        {/* Store components  */}
        <Route path='/' element={<Products />} />
        <Route path='/detail/:slug/' element={<ProductDetail/>} />
      </Routes>
      <StoreFooter />
    
    </BrowserRouter>
  )
}

export default App;
