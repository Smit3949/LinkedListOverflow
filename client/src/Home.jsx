import React, { useState, useEffect } from 'react'
import Box from './components/Box';
export default function Home() {
    const [questions, setQuestions] = useState([]);
    const [userId, setuserId] = useState('');
    useEffect(() => {
        var backend_url = "http://localhost:3001";

        fetch(backend_url, {
            method: "GET",
            headers: {
                "Content-type": "applicationQuestionId/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(json => setQuestions(json))
            .catch(err => console.log(err));
    }, []);

    console.log(questions);

    return (
        <>
            {
                
                questions.map((question) => (
                    (question.userId === userId) ? <Box title={question.title} body={question.body} tags={question.tags} QuestionId={question.QuestionId} edit={true}  /> : <Box title={question.title} body={question.body} tags={question.tags} QuestionId={question.QuestionId } edit={false}/>
                ))
            }
        </>
    )
}
