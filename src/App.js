import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header/header";
import Footer from './components/footer/Footer';
import ErrorPage from './components/error-page/ErrorPage';
import ItemList from './components/item-list/ItemList';
import ItemDetail from './components/item-detail/ItemDetail';
import CartProvider from './cart-context/CartContext';
import Cart from "./components/cart/Cart";
import Orders from "./components/order-list/orders";
import OrderDetail from "./components/order-detail/order-detail";

const App = () => {
  return (
      <div className="app-container">
          <Router>
              <CartProvider>
                  <Header />
                  <Routes>
                      <Route path="/" element={<ItemList />} />
                      <Route path="/items/new" element={<ItemDetail formType='add'/>} />
                      <Route path="/items/:itemId" element={<ItemDetail formType="view"/>} />
                      <Route path="/items/:itemId/edit" element={<ItemDetail formType='edit'/>} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/orders/:orderId" element={<OrderDetail />} />
                      <Route path="*" element={<ErrorPage />} />
                  </Routes>
              </CartProvider>
            <Footer />
          </Router>
      </div>
  );
};

export default App;
