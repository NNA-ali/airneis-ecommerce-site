import React, { useEffect, useState } from 'react'
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
import { CartContext } from './views/plugin/Context'
import Cart from './views/store/Cart'
import Checkout from './views/store/Checkout'
import PaymentSuccess from './views/store/PaymentSuccess'
import Account from './views/customer/Account'
import PrivateRoutes from './layout/PrivateRoute'
import Orders from './views/customer/Orders'
import OrderDetail from './views/customer/OrderDetail'
import CartID from './views/plugin/cartID'
import UserData from './views/plugin/UserData'
import apiInstance from './utils/axios'

import Category from './views/category/Category.jsx'

function App() {

  const [count,setCount] = useState(0)
  const [cartCount, setCartCount] = useState()

  const cart_id = CartID()
  const userData = UserData()

  useEffect(() =>  {
    const url = userData ? `cart-list/${cart_id}/${userData?.user_id}/`: `cart-list/${cart_id}/`
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
    })
  })
  
  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
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
          <Route path='/cart/' element={<Cart/>} />
          <Route path='/checkout/:order_oid/' element={<Checkout />} />
          <Route path='/payment-success/:order_oid/' element={<PaymentSuccess />} />

          {/* Category Routes */}
          <Route path='/category/Bed' element={<Category  title="Bed"/>} />
          <Route path='/category/Couch' element={<Category title="Couch"/>} />
          <Route path='/category/Desk' element={<Category title="Desk"/>} />
          <Route path='/category/Dinner Table' element={<Category title="Dinner Table"/>} />
          <Route path='/category/Office Chair' element={<Category title="Office Chair"/>} />
          <Route path='/category/Storage' element={<Category title="Storage"/>} />
          {/* Ajoutez ici des routes pour les autres catégories */}
          
          {/* Customer Routes */}
          <Route path='/customer/account/' element={<PrivateRoutes> <Account /></PrivateRoutes> } />
          <Route path='/customer/orders/' element={<PrivateRoutes> <Orders /></PrivateRoutes> } />
          <Route path='/customer/orders/:order_oid/' element={<PrivateRoutes> <OrderDetail /></PrivateRoutes> } />
        </Routes>
        <StoreFooter />
      </BrowserRouter>
    </CartContext.Provider>  
  )
}

export default App;
