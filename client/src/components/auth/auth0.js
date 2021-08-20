import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export function Login() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div className=" text-black mx-1">
            <button onClick={() => { loginWithRedirect() }}>Login</button>
        </div>
    )
}
export function LoginWithoutButton() {
    const { loginWithRedirect } = useAuth0();
    return (loginWithRedirect());
}

export function Logout() {
    const { logout } = useAuth0();
    return (
        <div className=" text-black mx-1">
            <button onClick={() => { logout() }}>Logout</button>
        </div>
    )
}