import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';
import AuthContext from '../contexts/AuthContext';
import useLogout from '../hooks/useLogout';
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from '../hooks/useAuth';

const Header = () => {

  const navigate = useNavigate()
  const logout = useLogout()
  const [loading, setLoading] = useState(false)
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemQty } = useContext(CartContext);
  const {accessToken, refreshToken} = useContext(AuthContext);
  const axiosPrivateInstance = useAxiosPrivate()
  const { user, setUser } = useAuth()
  // const [isActive, setIsActive] = useState(false);
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     window.screenY > 60 ? setIsActive(true) : setIsActive(false);
  //   });
  // }, []);

  const {cart} = useContext(CartContext);

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart));
  });

  useEffect(() => {
    async function getUser() {
        const { data } = await axiosPrivateInstance.get('/accounts/user/')
        // console.log(data)
        setUser(data)
    }

    getUser()
}, [axiosPrivateInstance, setUser]);

  // console.log(user);

  async function onLogout() {
    setLoading(true)

    await logout()
    navigate('/')
}

  return (
    <header 
    // className={`${isActive ? 'bg-pink-300' : 'bg-gray-200'} fixed w-full z-10 transition-all shadow-lg`}
    className="fixed w-full z-10 transition-all bg-gray-200 shadow-lg"
    >
      <div className="flex container items-center justify-between mx-auto h-[72px]">
        {/* Logo */}
        <Link to={"/"}>
          <div className="ml-8">
            <img src={Logo} alt={"Logo"} className="w-[40px]" />
          </div>
        </Link>

        <div>
          { (accessToken || refreshToken) ? (
              <div className="flex flex-row space-x-2">
                <h3><Link to={`/me`}>{user.first_name}</Link></h3>
                <div onClick={onLogout}>
                  Logout
                </div>
              </div>
              ) : <Link to={"/login"}>Login</Link>}
        </div>

        {/* Cart */}
        <div
          onClick={()=>setIsOpen(!isOpen)}
          className="cursor-pointer flex relative max-w-[50px] mr-8"
        >
          <BsBag className="text-2xl text-gray-700" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">{itemQty}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
