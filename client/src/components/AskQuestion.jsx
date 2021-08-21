import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
export default function AskQuestion() {
    const [quill, setQuill] = useState(null);
    const [title, setTitle] = useState('');
    const [tagstring, setTagstring] = useState('');
    useEffect(() => {
        var q = new Quill('#ask-que-in-body', {
            theme: 'snow'
        });
        setQuill(q);
        return () => {
        }
    }, []);

    const askQuestion = () => {
        var backend_url = "";
        var quilldata = quill.getContents();
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

        console.log(tags);

        var data = {
            title: title,
            body: quilldata,
            tags: tags,
            answers: [],
        };



    };


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
                <input onChange={(e) => {  setTitle(e.target.value)}} className="ask-que-in-title mb-5 p-1 rounded shadow-md mt-2 border border-black" />
                <div className="ask-box-title text-xl font-medium">
                    Body                   
                </div>
                <div className="ask-box-title text-base font-light">
                    Include all the information someone would need to answer your question
                </div>
                <div id="ask-que-in-body" >
                </div>
                <div className="ask-box-title mt-5 text-xl font-medium">
                    Tags                
                </div>
                <div className="ask-box-title text-base font-light">
                    Add up to 5 tags to describe what your question is about
                </div>
                <input onChange={(e) => { setTagstring(e.target.value) }} placeholder="enter tags by separated Comma" className="ask-que-in-title mb-5 p-1 rounded shadow-md mt-2 border border-black" />
                <div className=" ask-submit text-black p-2 bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
                    <button onClick={ askQuestion } >Submit</button>
                </div>
            </div>

        </div>
    )
}
