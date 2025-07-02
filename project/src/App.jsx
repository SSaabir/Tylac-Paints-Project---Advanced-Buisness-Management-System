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
import Checkout from './pages/Checkout'
import Instruction from './pages/Instruction'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import Profile from './pages/Profile'
import InboxD from './pages/InboxD'
import ProductD from './pages/ProductD'
import ProjectD from './pages/ProjectD'
import UserD from './pages/UserD'

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
      <Route path="/checkout" element={<Checkout />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/instruction" element={<Instruction />}/>
      <Route path="/faq" element={<FAQ />}/>
      <Route path="/terms" element={<Terms />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/inboxd" element={<InboxD />}/>
      <Route path="/productd" element={<ProductD />}/>
      <Route path="/projectd" element={<ProjectD />}/>      
      <Route path="/userd" element={<UserD />}/>
      
      
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
