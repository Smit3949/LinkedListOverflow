import React, { useState, useEffect } from 'react'
import Box from './components/Box';
import Header from './components/Header';
import { useAuth0 } from '@auth0/auth0-react'
export default function Home() {
    const [questions, setQuestions] = useState([]);
    const { isAuthenticated, user } = useAuth0();
    const [userId, setuserId] = useState(user.email);
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


    return (
        <>
            <Header />
            {
                
                questions.map((question) => (
                    (question.userId === userId) ? <Box title={question.title} body={question.body} tags={question.tags} QuestionId={question.QuestionId} edit={true}  /> : <Box title={question.title} body={question.body} tags={question.tags} QuestionId={question.QuestionId } edit={false}/>
                ))
            }
        </>
    )
}
