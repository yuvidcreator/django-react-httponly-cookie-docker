import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { ProductContext } from '../../contexts/ProductContext';

const ProductDetails = () => {

  const {id} = useParams();

  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // get the single product based on id
  const product = products.find(item => {
    return item.id === parseInt(id);
  })

  if (!product) {
    return <section className="flex justify-center items-center text-center min-h-screen">Loading......</section>
  }

  const {title, image, price, description } = product;

  // console.log(product);
  
  return (
    <section className="pt-32 pb-12 lg:py-32 min-h-screen">
      <div className="container mx-auto">
        {/* image & text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img src={image} alt={title} className="max-w-[200px] lg:max-w-sm" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto">
              {title}
            </h1>
            <h3 className="text-xl text-red-500 font-medium mb-6">
              ₹ {price}
            </h3>
            <p className="mb-8">{description}</p>
            <button 
              onClick={()=>addToCart(product, product.id)}
              className="bg-black py-4 px-8 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
