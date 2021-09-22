import React, { useState, useEffect } from 'react'
import Box from './Box';
import Web3 from 'web3';
import QA from '../abis/QA.json';

export default function Home() {
    const [questions, setQuestions] = useState([]);
    const [Qa, setQa] = useState(null);
    const [account, setAccount] = useState('');
    const [count, setCount] = useState(0);
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
            var cnt = await qa.methods.countids().call();
            setCount(cnt);
            setQa(qa);

            for (var i = 0; i < cnt; i++) {
                const id = await qa.methods.Ids(i).call();
                const data = await qa.methods.questions(id).call();
                console.log(data.title);
                setQuestions([
                        {
                            QuestionId: id,
                            title: data.title,
                            body: data.body,
                            tags: data.tags
                        }
                    ]
                )
            }
            console.log(questions)
        }
        else {
         window.alert('QA contract not deployed to detected network');
        }
        
    }, []);

   





    return (
        <>
            {
                
                questions && questions.map((question) => (
                    <Box title={question.title} body={question.body} tagstring={question.tags} QuestionId={question.QuestionId}/>
                ))
            }
        </>
    )
}