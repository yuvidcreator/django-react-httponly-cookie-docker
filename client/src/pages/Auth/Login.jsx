import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosInstance } from '../../axios'
import useAuth from '../../hooks/useAuth'

export default function Login() {

    const { accessToken, setAccessToken, setRefreshToken, setCSRFToken } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const fromLocation = location?.state?.from?.pathname || '/'
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        if (accessToken) {
            navigate(fromLocation, { replace: true });
        }
    });

    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstance.post('/accounts/login/', JSON.stringify({
                email,
                password
            }))

            setAccessToken(response?.data?.access_token)
            setRefreshToken(response?.data?.refresh_token)
            setCSRFToken(response.headers["x-csrftoken"])
            setEmail()
            setPassword()
            setLoading(false)

            navigate(fromLocation, { replace: true })
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h2 className="font-semibold text-xl text-center my-4">Login</h2>
            <form onSubmit={onSubmitForm} className="space-y-4">
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
                        type="password" 
                        placeholder='Password' 
                        autoComplete='off' 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="password" 
                        onChange={onPasswordChange} 
                    />
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button disabled={loading} className='bg-black py-4 px-8 text-white' type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
