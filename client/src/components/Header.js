import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Login, Logout } from "./auth/auth0";
import Logo from './logo.svg.png';
export default function Header() {
    const [toolTip, showToolTip] = useState(false);
  
    const { isAuthenticated, user } = useAuth0();
  
    return (
    <div className="text-black flex py-2 px-2 justify-between items-center">
      <div className="flex items-center">
        <div className="h-7">
          <img className="h-full" src={Logo} alt="codeconnect logo" />
        </div>
      </div>
      <div className="flex items-center">
        {
          isAuthenticated ?
            <Logout /> :
            <Login />
        }
        <div className="mx-1 relative">
          {
            isAuthenticated &&
            <img onMouseEnter={() => { showToolTip(true) }} onMouseLeave={() => { showToolTip(false) }} className="h-7 w-7 rounded-full" src={user.picture} alt="user icon" />
          }
          {
            toolTip && isAuthenticated &&
            <div className="absolute z-50 top-full right-0 mt-2 text-center text-xs  bg-black mr-4 px-1">{user.email}</div>
          }
        </div>
      </div>
    </div>
  )
}
