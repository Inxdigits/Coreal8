import React, { useState, useEffect } from "react";
import "./CartMechanism.css";
import courseimg from "../../../Assets/CartPageAssets/cartImage.png";
import update from '../../../Assets/CartPageAssets/update-restore.svg';

const CartMechanism = ({ setArrayLength }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      price: 45000,
      quantity: 1,
      image: courseimg,
    },
    {
      id: 2,
      title: "The Visionary Leader's Blueprint",
      price: 45000,
      quantity: 1,
      image: courseimg,
    },
    {
      id: 3,
      title: "The Visionary Leader's Blueprint",
      price: 45000,
      quantity: 1,
      image: courseimg,
    },
  ]);

  useEffect(() => {
    setArrayLength(cartItems.length);
  }, [cartItems, setArrayLength]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    );
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCart = () => {
    console.log("cart updated");
  };

  return (
    <div className="cart-mechanism-container flex-column">
      <header>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
      </header>

      <div className="divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="782"
          height="2"
          viewBox="0 0 782 2"
          fill="none"
        >
          <path
            d="M1 1L781 1"
            stroke="#0D0C12"
            stroke-opacity="0.1"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <main className="cart-mechanism">
        <div className="cart">
          {cartItems.map((item) => (
            <article key={item.id} className="cartitem">
              <div className="cartitem-info">
                {item.image ? (
                  <img src={item.image} alt="Product" />
                ) : (
                  <div className="relative w-[86px] h-[86px] bg-[linear-gradient(0deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_100%)]" />
                )}

                <div className="cartitem-info-text">
                  <h3 className="title">{item.title}</h3>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
              <div className="price">N{item.price.toLocaleString()}</div>
              <div className="quantity">
                <button
                  className="cursor-pointer"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease Quantity"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className=""
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="total">
                N{(item.price * item.quantity).toLocaleString()}
              </div>
            </article>
          ))}
        </div>
      </main>

      <div className="divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="782"
          height="2"
          viewBox="0 0 782 2"
          fill="none"
        >
          <path
            d="M1 1L781 1"
            stroke="#0D0C12"
            stroke-opacity="0.1"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div className="bottom">
        <button className="updatecart" onClick={{ updateCart }}>
          <img src={update} alt="" />
          Update
        </button>

        <div className="gradient-button-container clearcart-container">
          <button className="clearcart gradient-button" onClick={clearCart}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartMechanism;
