import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import "quill/dist/quill.snow.css";
export default function ShowQuestion() {
    const { id: QuestionId } = useParams();
    const [question, setQuestion] = useState([{ title: '', body: '', tags: [], answers: []}]);
    const [textarea, setTextarea] = useState('');
    
    console.log(QuestionId)
    useEffect(() => {

        var backend_url = "http://localhost:3001/find-question?QuestionId=" + QuestionId;
        fetch(backend_url, {
            method: "GET"
        })
            .then(res => res.json())
            .then(json => { setQuestion(json) });
        
    }, []);

    const addAnswer = () => {
        var backend_url = "http://localhost:3001/addAnswer";
        var quilldata = textarea;
        const QuestionId = QuestionId;
        const userId = "";
        var data = {
            userId: userId,
            QuestionId: QuestionId,
            body: quilldata
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

    console.log(question)
    return (
        <div >
            <div className= " sq-title text-4xl m-6 text-blue-600 box-title">
                {question[0].title}
            </div>
            <div className="Box mt-4 p-4 rounded w-100px shadow-md border border-black border-opacity-10">
                
                <div className="box-desc">
                    {question[0].body}
                </div>
                <div className="box-tagcont">
                    {
                        question[0].tags && question[0].tags.map((tag) => (
                            <div className="box-tag p-1 bg-gray-300 rounded-sm border border-black border-opacity-10 mx-1"> { tag }</div>
                        ))
                    }
                </div>
            </div>

            <div className= " sq-title text-2xl m-6 text-gray-400 box-title">
                { question[0].answers.length } Answers
            </div>
            
            {
                question[0].answers.map((answer, index) => (
                    <div className="Box mt-4 p-4 rounded w-100px shadow-md border border-black border-opacity-10">
                        <div className="box-desc">
                            { answer.ans }
                        </div>
                        <div className="float-right pb-16 text-gray-500">
                            { answer.ansUserId }
                        </div>
                    </div>
                ))
            }
                

            <div className= " sq-title text-2xl m-6 text-green-400 box-title">
                    Your Answer
            </div>
            <div className="Box w-100px">
                <textarea rows="10" onChange={(e) => { setTextarea(e.target.value) }} value={textarea} className="Box mb-5 w-100px p-1 rounded shadow-md mt-2 border border-black"> </textarea>
            </div>
            <div className="Box ask-submit text-black p-2 w-100px bg-blue-100 rounded-sm border border-black border-opacity-10 mx-1">
                <button onClick={ addAnswer }>Submit Your Answer</button>
            </div>
        </div>
    )
}
