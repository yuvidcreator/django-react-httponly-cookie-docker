import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
// import AuthMiddleware from './middleware/Auth';
import User from './pages/UserAccount/User';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetail/ProductDetails';



const App = () => {
  return (
    <div className='overflow-hidden'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/product/:id' element={<ProductDetails />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/signup' element={<Register />} /> 
          {/* <Route path='/user' element={<AuthMiddleware />}>
            <Route index element={<User />}></Route>
          </Route> */}
          <Route path='/me' element={<User />} />
        </Routes>
        <Sidebar />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
