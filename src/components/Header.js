import React, { useState } from 'react';
import Logo from './logo-stackoverflow.svg';
import Identicon from 'identicon.js';

export default function Header({ account }) {
    
    var acc = account.toString();
    if(!acc) acc = '1234567890123456'

    return (
      <div className="text-black flex py-2 px-2 justify-between items-center border-2 logo-container">
            
          <div className="flex items-center">
              <div class="logo-holder logo-1">
                  <h3>LinkedListOverflow</h3>
              </div>
          </div>
          



        <div className="flex items-center">
          
            <div className="ask-question flex items-center y-10 mx-1">
            { acc }
            </div>
          
          <div className="mx-1 relative">
              <img
                  className='ml-2'
                  width='50'
                  height='50'
                  src={`data:image/png;base64,${new Identicon(acc, 50).toString()}`}
              />
          </div>
        </div>

    </div>
  )
}

