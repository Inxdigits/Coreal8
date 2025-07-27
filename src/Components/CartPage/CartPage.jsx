import React, {useState} from 'react';
import './Cartpage.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartMechanism from './CartMechanism/CartMechanism.jsx';
import CartPayment from './CartPayment.jsx';

const CartPage = () => {
  const [arrayLength, setArrayLength] = useState(0);

  return (
    <div className="cartpage">
      <Navbar />
        <div className="cartpage-container">
            <section className="cart-intro">
                <div className="cart-intro-text">
                    <h2>Cart</h2>
                    <span>You have {arrayLength} Cart Items</span>
                </div>
                <div className="gradient-button-container ci-btn-container">
                    <button className="gradient-button ci-btn">
                        Add to Cart
                    </button>
                </div>
            </section>
            <section className="cartmain">
                <CartMechanism setArrayLength={setArrayLength} />
                <CartPayment />
            </section>
        </div>
      <Footer />
    </div>
  )
}

export default CartPage
