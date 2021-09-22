import React, { useState } from 'react';
import Logo from './logo-stackoverflow.svg';
import Identicon from 'identicon.js';

export default function Header({ account }) {
    
    var acc = account.toString();

    return (
        <div className="text-black flex py-2 px-2 justify-between items-center border-2">
            
      <div className="flex items-center">
        <div className="h-7">
          <img className="h-full" src={Logo} alt="codeconnect logo" />
        </div>
        </div>
        
        <div className="flex items-center">
        <div>{ account }</div>
                {account ?
                    <img
                        className='ml-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(acc, 30).toString()}`}
                    />
                    :
                    <span></span>
                }
      </div>
    </div>
  )
}