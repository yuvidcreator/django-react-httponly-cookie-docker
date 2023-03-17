import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useLogout from "../../hooks/useLogout"

export default function User() {

    const { user, setUser } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()
    const navigate = useNavigate()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)

    async function onLogout() {
        setLoading(true)

        await logout()
        navigate('/')
    }

    useEffect(() => {
        async function getUser() {
            const { data } = await axiosPrivateInstance.get('/accounts/user/')
            setUser(data)
        }

        getUser()
    }, [axiosPrivateInstance, setUser])

    return (
        <div className="flex justify-center items-center min-h-screen space-x-2">
            <h3><Link to={`/me`}>{user.email}</Link></h3>
            {/* <h4>{user?.email}</h4> */}
            <button disabled={loading} type='button' onClick={onLogout}>Logout</button>
        </div>
    )
}
