import React, { useState } from 'react';
import './CartMechanism.css'

const CartMechanism = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "The Visionary Leader's Blueprint",
            price: 45000,
            quantity: 1,
        },
        {
            id: 2,
            title: "The Visionary Leader's Blueprint",
            price: 45000,
            quantity: 1,
        },
        {
            id: 3,
            title: "The Visionary Leader's Blueprint",
            price: 45000,
            quantity: 1,
        },
    ]);

    const handleQuantityChange = (id, change) => {
        setCartItems((prevItems) => {
            prevItems.map((item) => 
                item.id === id ? {...item, quantity: Math.max(1, item.quantity + change) } : item,
            )
        }
        )
    }

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    const handleClearCart = () => {
        setCartItems([]);
    }

    const handleUpdateCart = () => {
        // Update Cart Functionality
        console.log('cart updated');
    }

  return (
    <div className="cart-mechanism-container">
        <header>
            
        </header>
    </div>

  )
}

export default CartMechanism
