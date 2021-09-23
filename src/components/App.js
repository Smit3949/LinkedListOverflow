import QA from '../abis/QA.json'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import Header from './Header';
import AskQuestion from './AskQuestion';
import Home from './Home';
import ShowQuestion from './ShowQuestion';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//Declare IPFS
// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

export default function App() {
  const [account, setAccount] = useState('');
  const [Qa, setQa] = useState();
  const [questions, setQuestions] = useState();
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
    setAccount(account);
    const networkId = await web3.eth.net.getId();
   // console.log(networkId)
    const networkData = QA.networks[networkId];
    if (networkData) {
      const qa = new web3.eth.Contract(QA.abi, networkData.address);
      setQa(qa);
    }
    else {
      window.alert('QA contract not deployed to detected network');
    }
    
  }, [])
  
  var sty = {
    'background-color': 'white'
  }
  return (
      
    <div style={ sty }>
      <Header account={account} />
      
       <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/ask-question" exact>
              <AskQuestion /> 
            </Route>
            {/* <Route path="/edit/:id" component={ Edit } /> */}
            <Route path="/:id" component={ShowQuestion} />
            </Switch>
        </Router>
    </div>
    
  )
}