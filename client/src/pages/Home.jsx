import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Pages/HomePage/Hero';
import BlogPostGrid from '../components/Pages/HomePage/BlogPosts';



const Home = () => {

  const {products} = useContext(ProductContext);

  const filteredProducts = products.filter(item => {
    return (item.category === "men's clothing" || item.category === "women's clothing");
  });

  // console.log(filteredProducts);

  return (
    <>
      <section className="py-16">
        <Hero />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 p-4">
            {
              filteredProducts.map((product)=>{
                return (
                  <Product key={product.id} product={product} />
                )
              })
            }
          </div>

          <div className="flex justify-center items-center text-center mb-16 mt-4">
            <Link 
              to={"/products"}
              className="flex w-fit space-x-2 rounded-md bg-blue-900 px-4 py-3 font-semibold shadow-lg shadow-blue-500/40 transition-all duration-300 hover:-translate-y-[2px] hover:bg-black hover:shadow-blue-800/20 text-white"
            >
              Shop More
              <svg className="w-4 h-6 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <BlogPostGrid />
        </div>
      </section>
    </>
  );
};

export default Home;
