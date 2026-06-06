// import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Login'
import SignUp from './SignUp'
import Product from './components/Product'
import ProductDetails from './components/ProductDetails'



function App() {
  return (
     <Routes>
      <Route path="/"element={<Login />}/>
      <Route path="/SignUp"element={<SignUp />}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Product" element={<Product/>}/>
      <Route path="/Product/:no" element={<ProductDetails/>}/>
      </Routes>
  )
}

export default App