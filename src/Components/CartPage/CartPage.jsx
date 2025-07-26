import React from 'react';
import './Cartpage.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartMechanism from './CartMechanism/CartMechanism.jsx';

const CartPage = () => {
  return (
    <div className="cartpage">
      <Navbar />
        <div className="cartpage-container">
            <section className="cart-intro">
                <div className="cart-intro-text">
                    <h2>Cart</h2>
                    <span>You have 3 Cart Items</span>
                </div>
                <div className="gradient-button-container ci-btn-container">
                    <button className="gradient-button ci-btn">
                        Add to Cart
                    </button>
                </div>
            </section>
            <section className="cartmain">
                <CartMechanism />
            </section>
        </div>
      <Footer />
    </div>
  )
}

export default CartPage
