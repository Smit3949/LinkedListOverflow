import React, { useState, useEffect } from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css";
export default function ShowQuestion({ userId, QuestionId }) {
    
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        var q = new Quill('#enter-answer', {
            theme: 'snow'
        });
        setQuill(q);
        return () => {
        }
    }, []);

    const tags = ['tag1', 'tag2', 'tag3'];

    return (
        <div >
            <div className= " sq-title text-4xl m-6 text-blue-600 box-title">
                    Hello
            </div>
            <div className="Box mt-4 p-4 rounded w-100px shadow-md border border-black border-opacity-10">
                
                <div className="box-desc">
                    My name is Smit.
                </div>
                <div className="box-tagcont">
                    {
                        tags.map((tag) => (
                            <div className="box-tag p-1 bg-gray-300 rounded-sm border border-black border-opacity-10 mx-1"> { tag }</div>
                        ))
                    }
                </div>
            </div>

            <div className= " sq-title text-2xl m-6 text-gray-400 box-title">
                    Answers
            </div>
            <div className="Box mt-4 p-4 rounded w-100px shadow-md border border-black border-opacity-10">
                <div className="box-desc">
                    My name is Smit.
                </div>
            </div>

            <div className= " sq-title text-2xl m-6 text-gray-400 box-title">
                    Your Answer
            </div>
            <div className="Box w-100px">
                <div id="enter-answer">
                </div>
            </div>
            <div className="Box ask-submit text-black p-2 w-100px bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
                    <button>Submit Your Answer</button>
            </div>
        </div>
    )
}
