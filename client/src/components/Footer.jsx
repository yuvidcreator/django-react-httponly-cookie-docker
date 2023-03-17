import React from 'react';
import {Link} from 'react-router-dom';



const Footer = () => {
    const fullYear = new Date().getFullYear();

    return (
        <>
            <div className=" bg-gray-900">
                <div className="max-w-2xl mx-auto text-white py-10">
                    <div className="text-center">
                        <h3 className="text-3xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-orange-500"> Django React </h3>
                        <p> Ecommerce Store </p>
                        <div className="flex justify-center my-10">
                            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                                <img width={180} height={90} alt={"pro"} src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs text-gray-200'>Launching Soon</p>
                                    <p className="text-sm md:text-base"> </p>
                                </div>
                            </div>
                            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                                <img width={180} height={90} alt={"pro"} src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs text-gray-200'>Launching Soon</p>
                                    <p className="text-sm md:text-base"> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-xs lg:text-sm text-gray-400">
                        <div className="order-1 md:order-2">
                            <Link to={"/about"}>
                                <span className="px-2">About us</span>
                            </Link>
                            <Link to={"/contact"}>
                                <span className="px-2 border-l">Contact us</span>
                            </Link>
                            <Link to={"/privacy"}>
                                <span className="px-2 border-l">Privacy Policy</span>
                            </Link>
                            <Link to={"/terms"}>
                                <span className="px-2 border-l">Terms</span>
                            </Link>
                        </div>

                        <p className="order-2 md:order-1 mt-8 md:mt-0 mb-12 md:mb-0">
                            {fullYear} &copy; 
                            <Link 
                                to={"/"} 
                                className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-orange-500"
                            >
                                {' '}DJ-React Ecom.
                            </Link>
                            {' '}Designed by{' '}
                            <Link 
                                to={"https://www.webinoxmedia.com"} 
                                target={"_blank"}
                                className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500"
                            >
                                WebinoxMedia
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer