import React, { useState, useEffect, createContext } from 'react';


export const CartContext = createContext();

const getCartLS = typeof window !== "undefined" && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart' || [])) : [];

const CartProvider = ({ children }) => {

  // cart state
  const [ cart, setCart] = useState(getCartLS);
  const [ total, setTotal ] = useState(0);
  const [ itemQty, setItemQty ] = useState(0);

  // update item count of cart
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemQty(amount);
    };
    // setCart(getCartLS);
  }, [cart]);

  // Cart Total Price
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0);
    setTotal(total);
    // setCart(getCartLS);
  }, [cart, total]);

  // add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1}
    
    //check if the item is already in the cart
    const cartItem = cart.find((item)=>{
      return item.id === id;
    });

    // if cart item is already in the cart
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: cartItem.amount + 1
          };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Single product / item remove from Cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item)=>{
      return item.id !== id;
    });
    setCart(newCart);
  };

  // clear All Items from Cart
  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
    // console.log(cartItem);
  };

  // console.log(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemQty,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
