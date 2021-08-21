import React, { useState} from 'react';
import "quill/dist/quill.snow.css";
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react'
export default function AskQuestion() {
    const [title, setTitle] = useState('');
    const [tagstring, setTagstring] = useState('');
    const [textarea, setTextarea] = useState('');
    const { isAuthenticated, user } = useAuth0();
    const [userId, setuserId] = useState(user.email);
    
    const askQuestion = () => {
        var backend_url = "http://localhost:3001/addQuestion";
        var quilldata = textarea;
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
            userId: userId,
            title: title,
            body: quilldata,
            tags: tags
        };
        console.log(data);

        fetch(backend_url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json));


    };


    return (
        <div>
            <Header />
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
                <textarea rows="10" onChange={(e) => { setTextarea(e.target.value) }} value={ textarea } className="ask-que-in-title mb-5 p-1 rounded shadow-md mt-2 border border-black"> </textarea>
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
