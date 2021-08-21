import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
export default function AskQuestion() {
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        var q = new Quill('#ask-que-in-body', {
            theme: 'snow'
        });
        setQuill(q);
        return () => {
        }
    }, [])
    return (
        <div>
            <div className="ask-title mt-4 text-3xl">
                Ask a public question
            </div>
            <div className="Box mt-4 p-4 rounded w-50px shadow-md border border-black border-opacity-20">
                <div className="ask-box-title text-xl font-medium">
                    Title                    
                </div>
                <div className="ask-box-title text-base font-light">
                    Be specific and imagine you’re asking a question to another person
                </div>
                <input className="ask-que-in-title mb-5 p-1 rounded shadow-md mt-2 border border-black" />
                <div className="ask-box-title text-xl font-medium">
                    Body                   
                </div>
                <div className="ask-box-title text-base font-light">
                    Include all the information someone would need to answer your question
                </div>
                <div className="p-1 rounded border border-black">
                    <div id="ask-que-in-body" >
                    </div>
                </div>
                <div className="ask-box-title mt-5 text-xl font-medium">
                    Tags                
                </div>
                <div className="ask-box-title text-base font-light">
                    Add up to 5 tags to describe what your question is about
                </div>
                <input className="ask-que-in-title mb-5 p-1 rounded shadow-md mt-2 border border-black" />
                <div className=" ask-submit text-black p-2 bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
                    <button>Submit</button>
                </div>
            </div>

        </div>
    )
}
