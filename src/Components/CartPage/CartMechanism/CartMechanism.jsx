import React from "react";
import "./CartMechanism.css";
import update from "../../../Assets/CartPageAssets/update-restore.svg";

const CartMechanism = ({ cartItems, updateQuantity, removeItem, clearCart }) => {
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

      <main className="cart-mechanism">
        <div className="cart">
          {cartItems.map((item) => (
            <article key={item.id} className="cartitem">
              <div className="cartitem-info">
                {item.image ? (
                  <img src={item.image} alt="Product" />
                ) : (
                  <div className="relative w-[86px] h-[86px] bg-gray-200" />
                )}

                <div className="cartitem-info-text">
                  <h3 className="title">{item.title}</h3>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
              <div className="price">N{item.price.toLocaleString()}</div>
              <div className="quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
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

      <div className="bottom">
        <button className="updatecart" onClick={updateCart}>
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
