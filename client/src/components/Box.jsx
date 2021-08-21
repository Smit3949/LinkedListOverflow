import React from 'react'
import {
  Link
} from "react-router-dom";
export default function Box({ title, body, tags, QuestionId, edit}) {
    console.log(title, body, tags);
    const reach = "/" + QuestionId;
    return (
       
        <div >
             
            <div className="Box Box-cur mt-4 p-4 rounded  h-50px w-50px shadow-md border border-black border-opacity-10">
            <Link to={ reach } >
                <div className= " text-lg text-blue-600 box-title">
                    {title}
                </div>
                <div className="box-desc">
                    { body }
                </div>
                <div className="box-tagcont">
                    {
                        tags && tags.map((tag) => (
                            <div className="box-tag p-1 bg-gray-300 rounded-sm border border-black border-opacity-10 mx-1"> { tag }</div>
                        ))
                    }
                    </div>
            </Link>
                {
                    edit &&
                    <Link to={"/edit/" + QuestionId}>
                        <div className="ask-submit text-black p-2 bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
                            Edit
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}
