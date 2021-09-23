import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom";

import Identicon from 'identicon.js';

export default function Box({ title, body, tagstring, QuestionId, account }) {
    const [qtags, setQtags] = useState([]);
    const reach = "/" + QuestionId;
    console.log(title, body, tagstring, QuestionId)
    var acc = account;
    
    
    useEffect(() => {
        var tags = [];

        var str = tagstring;
        var tag = "";
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ',') {
                tags.push(tag.trim());
                tag = "";
            }
            else {
                tag += str[i];
            }
        }
        tags.push(tag);

        for (var i = 0; i < tags.length; i++) {
            setQtags([
                    tags[i]
                ]
            )
        }

        console.log(qtags)
    }, [])

    
    return (
       
        <div className="h-50px w-50px">
             
            <div className="Box Box-cur mt-4 p-4 rounded  h-50px w-50px shadow-md border border-black border-opacity-10">
            <Link to={ reach } >
                <div className= " text-lg text-blue-600 box-title">
                    {title}
                </div>
                <div className="box-desc">
                    { body }
                </div>
                <div className="box-tagcont mb-7">
                    {
                        qtags && qtags.map((tag) => (
                            <div className="box-tag p-1  bg-gray-300 rounded-sm border border-black border-opacity-10 mx-1"> { tag }</div>
                        ))
                    }
                    </div>
            </Link>
                {
                    // edit
                    // <Link to={"/edit/" + QuestionId}>
                    //     <div className="ask-submit text-black p-2 bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
                    //         Edit
                    //     </div>
                    // </Link>
                }
                <div className="ask-submit  text-gray-700 p-2 mx-1">
                    <div className="flex ask-question">
          
                        <div className="y-10 mx-1">
                        { acc }
                        </div>
                    
                    <div className="mx-1 relative">
                        <img
                            className='ml-2'
                            width='30'
                            height='30'
                            src={`data:image/png;base64,${new Identicon(acc, 30).toString()}`}
                        />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}