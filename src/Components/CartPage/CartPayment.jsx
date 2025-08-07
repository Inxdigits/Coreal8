import React, { useState } from 'react';
import "./CartPayment/CartPayment.css";

const CartPayment = () => {
    const [orderData] = useState({
        subtotal: "N30,000",
        discount: "N0",
        total: "N30,000"
    });

    const handlePaymentClick = () => {
      console.log("proceeding to payment");
    }

  return (
    <div
      className="cartpayment-container"
      role="region"
      aria-labelledby="order-summary-title"
    >
      <h1 id="order-summary-title">Order Summary</h1>

      <div className="flex-between-div">
        <span className="">Subtotal:</span>
        <span
          className=""
          aria-label={`Subtotal amount: ${orderData.subtotal}`}
        >
          {orderData.subtotal}
        </span>
      </div>

      <div className="flex-between-div">
        <span className="">Discount:</span>
        <span
          className=""
          aria-label={`Discount amount: ${orderData.discount}`}
        >
          {orderData.discount}
        </span>
      </div>
      <hr
        className="relative self-stretch w-full h-px ml-[-0.50px] mr-[-0.50px] border-0 bg-current opacity-20"
        role="separator"
        aria-hidden="true"
      />

      <div className="flex-between-div total-amount">
        <span className="">Total:</span>
        <span className="" aria-label={`Total amount: ${orderData.total}`}>
          {orderData.total}
        </span>
      </div>

      <button
        className="payment-button"
        onClick={handlePaymentClick}
        type="button"
        aria-label="Proceed to Payment Checkout"
      >
        Proceed to Payment
      </button>

      <div className="hidden-fees">
        <span className="cp-info-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M10.4993 6.66699H10.506M10.4993 13.3337V9.16699M18.8327 10.0003C18.8327 14.6028 15.1018 18.3337 10.4993 18.3337C5.89685 18.3337 2.16602 14.6028 2.16602 10.0003C2.16602 5.39783 5.89685 1.66699 10.4993 1.66699C15.1018 1.66699 18.8327 5.39783 18.8327 10.0003Z"
              stroke="#801323"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p>No hidden fees. 30-day refund guarantee.</p>
      </div>
    </div>
  );
}

export default CartPayment
