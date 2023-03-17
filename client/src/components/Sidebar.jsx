import React, {useContext} from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';


const Sidebar = () => {
  const {isOpen, handleClose} = useContext(SidebarContext);
  const {cart, clearCart, total, itemQty} = useContext(CartContext);

  return (
    <div 
      className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 min-h-screen shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-all z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Cart ({itemQty})</div>
        <div 
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClose}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex justify-center items-center mt-2 text-lg font-semibold">Cart item</div>
      <div className="flex flex-col gap-y-2 h-[460px] lg:h-[520px] overflow-y-auto overflow-x-hidden border-b">
        {
          cart.map((item)=>{
            return (
              <CartItem key={item.id} item={item} />
            )
          })
        }
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* Total */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total: ₹ {parseFloat(total).toFixed(2)}</span>
          </div>
          {/* Clear Cart Icon */}
          <div 
            className="flex justify-center items-center text-xl py-4 bg-red-500 text-white w-12 h-12 cursor-pointer hover:bg-red-400"
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
        <Link to={""} className="bg-gray-300 flex p-4  justify-center items-center text-primary w-full font-medium">View Cart</Link>
        <Link to={""} className="bg-black text-white flex p-4  justify-center items-center w-full font-medium">Checkout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
