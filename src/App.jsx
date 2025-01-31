import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ProList from './components/ProList';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import Footer from './components/Footer';
import './components/style/App.css';

function App() {
  const products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'A stylish laptop with powerful features.',
      price: 799.99,
      quantityInStock: 20,
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'A sleek smartphone with a high-resolution camera.',
      price: 499.99,
      quantityInStock: 15,
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <Router>
      <div className="app-container"> 
        <Navbar cart={cart} />
       
        <div className="product-list-wrapper">
          <Routes>
            <Route path="/" element={<ProList products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/search" element={<ProList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
