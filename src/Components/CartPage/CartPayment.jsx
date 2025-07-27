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
    <div className='cartpayment-container' role="region" aria-labelledby="order-summary-title">
      <h1 id="order-summary-title">Order Summary</h1>

      <div className="">
        <span className="">Subtotal:</span>
        <span className="" aria-label={`Subtotal amount: ${orderData.subtotal}`}>
            {orderData.subtotal}
        </span>
      </div>

      <div className="">
        <span className="">
            Discount:
        </span>
        <span className="" aria-label={`Discount amount: ${orderData.discount}`}>{orderData.discount}</span>
      </div>
      <hr className="relative self-stretch w-full h-px ml-[-0.50px] mr-[-0.50px] border-0 bg-current opacity-20"
      role="separator" aria-hidden="true" />

      <div className="">
        <span className="">Total:</span>
        <span className="" aria-label={`Total amount: ${orderData.total}`}>{orderData.total}</span>
      </div>

      <button className="" onClick={handlePaymentClick} type="button" aria-label='Proceed to Payment Checkout'>Proceed to Payment</button>

      <div className="">
        <span className="" aria-hidden="true">i</span>
        <p>No hidden fees. 30-day refund guarantee.</p>
      </div>
    </div>
  )
}

export default CartPayment
