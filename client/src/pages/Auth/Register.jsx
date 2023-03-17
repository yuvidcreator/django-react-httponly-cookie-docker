import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { axiosInstance } from '../../axios'

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const pageLocation = location?.state?.from?.pathname || '/';
    const [loading, setLoading] = useState(false);
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            navigate(pageLocation, { replace: true });
        }
    });

    function onFirstNameChange(event) {
        setFirstName(event.target.value)
    };

    function onLastNameChange(event) {
        setLastName(event.target.value)
    };

    function onEmailChange(event) {
        setEmail(event.target.value)
    };

    function onMobileChange(event) {
        setMobile(event.target.value)
    };

    function onPasswordChange(event) {
        setPassword(event.target.value)
    };

    function onPasswordConfirmationChange(event) {
        setPasswordConfirmation(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const response = await axiosInstance.post('/accounts/register/', JSON.stringify({
                first_name,
                last_name,
                email,
                mobile,
                password,
                password2: passwordConfirmation
            }));
            // console.log(response);
            setFirstName();
            setLastName();
            setEmail();
            setMobile();
            setPassword();
            setPasswordConfirmation();
            setLoading(false);

            navigate('/login');
        } catch (error) {
            setLoading(false);
            // TODO: handle errors
        };
    };

    return (
        <section className="flex flex-col justify-center items-center min-h-screen">
            <h2 className="font-semibold text-xl text-center my-4">Register</h2>
            <form onSubmit={onSubmitForm} className="space-y-4">
                <div className="">
                    <input 
                        type="text" 
                        placeholder='First Name' 
                        autoComplete='off' 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id='first_name' 
                        onChange={onFirstNameChange} 
                    />
                </div>
                <div className="">
                    <input 
                        type="text" 
                        placeholder='Last Name' 
                        autoComplete='off' 
                        id="last_name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onLastNameChange} 
                    />
                </div>
                <div className="">
                    <input 
                        type="email" 
                        placeholder='Email' 
                        autoComplete='off' 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onEmailChange} 
                    />
                </div>
                <div className="">
                    <input 
                        type="number" 
                        placeholder='Mobile No' 
                        autoComplete='off' 
                        id="mobile" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onMobileChange} 
                    />
                </div>
                <div className="">
                    <input 
                        type="password" 
                        placeholder='Password' 
                        autoComplete='off' 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="password1" 
                        onChange={onPasswordChange} 
                    />
                </div>
                <div className="">
                    <input 
                        type="password" 
                        placeholder='Confirm Password' 
                        autoComplete='off' 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="password2" 
                        onChange={onPasswordConfirmationChange} 
                    />
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button disabled={loading} className='bg-black py-4 px-8 text-white' type="submit">Login</button>
                </div>
            </form>
        </section>
    );
};
