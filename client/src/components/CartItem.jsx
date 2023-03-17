import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';



const CartItem = ({ item }) => {

  const {increaseAmount, decreaseAmount, removeFromCart} = useContext(CartContext);

  const {id, title, image, price, amount} = item;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img src={image} alt={title} className="max-w-[80px]" />
        </Link>
        <div className="flex w-full flex-col">
          {/* title & remove icon */}
          <div className="flex justify-between mb-2">
            {/* Title */}
            <Link 
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            {/* Remove icon */}
            <div 
              className="cursor-pointer text-xl"
              onClick={()=>removeFromCart(id)}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* Qty */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              {/* minus icon */}
              <div 
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                onClick={()=>decreaseAmount(id)}
              >
                <IoMdRemove />
              </div>
              {/* Qty as amount */}
              <div className="h-full flex justify-center items-center px-2">{amount}</div>
              {/* plus icon */}
              <div 
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                onClick={()=>increaseAmount(id)}
              >
                <IoMdAdd />
              </div>
            </div>
            {/* Price */}
            <div className="flex flex-1 justify-around items-center">₹ {price}</div>
            {/* Final Price ---> as Qty increases */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">
              {`₹ ${parseFloat(price * amount).toFixed(2)}`}
              {/* {`₹ ${price * amount}`} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
