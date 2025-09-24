import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart reducer to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };
    
    default:
      return state;
  }
};

// Initial cart state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('coreal8-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coreal8-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Calculate totals whenever items change
  useEffect(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => {
      // Remove 'N' and ',' from price string and convert to number
      const price = parseFloat(item.price.replace(/[N,]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
    
    // Update totals in state
    if (totalItems !== state.totalItems || totalPrice !== state.totalPrice) {
      dispatch({ type: 'UPDATE_TOTALS', payload: { totalItems, totalPrice } });
    }
  }, [state.items, state.totalItems, state.totalPrice]);

  const addToCart = (course) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: course.id,
        title: course.title,
        price: course.price,
        thumbnail: course.thumbnail,
        instructor: course.instructor.name,
        duration: course.duration,
        level: course.level,
        rating: course.rating
      }
    });
  };

  const removeFromCart = (courseId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: courseId
    });
  };

  const updateQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: courseId, quantity }
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (courseId) => {
    return state.items.some(item => item.id === courseId);
  };

  const getCartItem = (courseId) => {
    return state.items.find(item => item.id === courseId);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
