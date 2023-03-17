import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './contexts/CartContext';
import SidebarContextProvider from './contexts/SidebarContext';
import ProductProvider from './contexts/ProductContext';
import {AuthContextProvider} from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <CartProvider>
      <SidebarContextProvider>
        <ProductProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ProductProvider>
      </SidebarContextProvider>
    </CartProvider>
  </AuthContextProvider>
);
