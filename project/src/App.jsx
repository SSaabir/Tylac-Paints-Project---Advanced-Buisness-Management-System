import React from 'react'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Colours from './pages/Colours'
import ContactUs from './pages/ContactUs'
import Product from './pages/Product'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/colours" element={<Colours />}/>
      <Route path="/contactus" element={<ContactUs />}/>
      <Route path="/product" element={<Product />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
