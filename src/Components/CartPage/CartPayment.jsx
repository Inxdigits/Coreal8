import React, { useMemo } from "react";
import "./CartPayment/CartPayment.css";

const CartPayment = ({ cartItems }) => {
  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = 0; // apply logic if needed
    const total = subtotal - discount;

    return {
      subtotal: `N${subtotal.toLocaleString()}`,
      discount: `N${discount.toLocaleString()}`,
      total: `N${total.toLocaleString()}`,
    };
  }, [cartItems]);

  const handlePaymentClick = () => {
    console.log("proceeding to payment");
  };

  return (
    <div className="cartpayment-container">
      <h1>Order Summary</h1>

      <div className="flex-between-div">
        <span>Subtotal:</span>
        <span>{subtotal}</span>
      </div>

      <div className="flex-between-div">
        <span>Discount:</span>
        <span>{discount}</span>
      </div>
      <hr />

      <div className="flex-between-div total-amount">
        <span>Total:</span>
        <span>{total}</span>
      </div>

      <button className="payment-button" onClick={handlePaymentClick}>
        Proceed to Payment
      </button>
      <div className="hidden-fees">
        {" "}
        <span className="cp-info-icon" aria-hidden="true">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            {" "}
            <path
              d="M10.4993 6.66699H10.506M10.4993 13.3337V9.16699M18.8327 10.0003C18.8327 14.6028 15.1018 18.3337 10.4993 18.3337C5.89685 18.3337 2.16602 14.6028 2.16602 10.0003C2.16602 5.39783 5.89685 1.66699 10.4993 1.66699C15.1018 1.66699 18.8327 5.39783 18.8327 10.0003Z"
              stroke="#801323"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
          </svg>{" "}
        </span>{" "}
        <p>No hidden fees. 30-day refund guarantee.</p>{" "}
      </div>
    </div>
  );
};

export default CartPayment;
