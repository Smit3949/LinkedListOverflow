import React, {useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export function Login() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div className=" text-black p-1 bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
            <button onClick={() => { loginWithRedirect() }}>Login</button>
        </div>
    )
}
export function LoginWithoutButton() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div className=" h-screen w-screen flex items-center justify-center z-50 ">
            <div className="Login-button text-white p-1 bg-blue-300 h-16 w-56 rounded-sm border border-black border-opacity-10 mx-1">
            <button id="login-button" onClick={() => { loginWithRedirect() }}>Login/Signup</button>
            </div>
            </div>
    )
}

export function Logout() {
    const { logout } = useAuth0();
    return (
        <div className=" text-black p-1 bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
            <button onClick={() => { logout() }}>Logout</button>
        </div>
    )
}