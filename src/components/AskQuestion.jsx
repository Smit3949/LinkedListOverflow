import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import QA from '../abis/QA.json';
import { v4 as uuidv4 } from 'uuid';

export default function AskQuestion() {
    const [title, setTitle] = useState('');
    const [tagstring, setTagstring] = useState('');
    const [textarea, setTextarea] = useState('');
    const [Qa, setQa] = useState();
    const [account, setAccount] = useState('');

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
    }, [])

    useEffect(async () => {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        setAccount(account[0]);
        const networkId = await web3.eth.net.getId();
        console.log(networkId)
        const networkData = QA.networks[networkId];
        if (networkData) {
            const qa = new web3.eth.Contract(QA.abi, networkData.address);
            setQa(qa);
        }
        else {
         window.alert('QA contract not deployed to detected network');
        }
        
    }, [])


    const askQuestion = () => {
        const QuestionId = uuidv4();
        Qa.methods.addQuestion(QuestionId, title, textarea, tagstring).send({ from: account }).on('QuestionAdded', (data) => {
            console.log(data);
        })
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
