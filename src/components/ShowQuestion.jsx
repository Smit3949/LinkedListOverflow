import React, { useState, useEffect } from 'react';
import Box from './Box';
import Web3 from 'web3';
import QA from '../abis/QA.json';
import { useParams } from 'react-router';

import Header from './Header';
export default function ShowQuestion({ }) {
    // const { id: QuestionId } = useParams();
    const QuestionId = '13acc1a5-2b46-45d9-8a1b-cc7cb08aceb9';
    const [question, setQuestion] = useState({ title: '', body: '', tags: '', answers: []});
    const [textarea, setTextarea] = useState('');

    console.log(QuestionId)

    const [Qa, setQa] = useState(null);
    const [account, setAccount] = useState('');
    const [qtags, setQtags] = useState([]);

    useEffect(async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }, []);

    useEffect(async () => {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        setAccount(account[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = QA.networks[networkId];
        if (networkData) {
            const qa = new web3.eth.Contract(QA.abi, networkData.address);
            setQa(qa);
            const data = await qa.methods.questions(QuestionId).call();
            console.log(data);
            setQuestion(
                {
                    QuestionId: QuestionId,
                    title: data.title,
                    body: data.body,
                    tags: data.tags,
                    answers: data.answers
                }
            
            );
            console.log(question);
        }
        else {
            window.alert('QA contract not deployed to detected network');
        }
        
    }, []);

    const addAnswer = async () => {
        const data = await Qa.methods.addAnswer(QuestionId, textarea).send({ from: account }).on('addsAns', (data) => {
            console.log(data);
        });
    }

    useEffect(() => {
       var tags = [];

        var str = question.tags;
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
    }, []);
    
    return (
        <div >
            <div className= " sq-title text-4xl m-6 text-blue-600 box-title">
                {question.title}
            </div>
            <div className="Box mt-4 p-4 rounded w-100px shadow-md border border-black border-opacity-10">
                
                <div className="box-desc">
                    {question.body}
                </div>
                <div className="box-tagcont">
                    {
                        qtags && qtags.map((tag) => (
                            <div className="box-tag p-1 bg-gray-300 rounded-sm border border-black border-opacity-10 mx-1"> { tag }</div>
                        ))
                    }
                </div>
            </div>
            {/* {
                <div className=" sq-title text-2xl m-6 text-gray-400 box-title">
                    {question.answers.length} Answers
                </div>
            } */}
            
            {
                question.answers && question.answers.map((answer, index) => (
                    <div className="Box mt-4 p-4 h-20 rounded w-100px shadow-md border border-black border-opacity-10">
                        <div className="box-desc">
                            { answer.ans }
                        </div>
                        <div className="float-right pb-16 text-gray-500">
                            { answer.ansUserId }
                        </div>
                    </div>
                ))
            }
                

            <div className= "sq-title text-2xl m-6 text-green-400 box-title">
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