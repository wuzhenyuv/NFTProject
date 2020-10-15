import React, { Component } from 'react'
import './static/ZombiePreview.css';
import MyWeb3 from './MyWeb3'
import {
    BrowserRouter as 
    Route,
    Link
  } from "react-router-dom"
import Page from "./Page";

class PoolInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { adcBalance:888,
                       pendingAdc:888
                     }
    }
        
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                that.getBalanceOfAdc()
                that.getPendingAdc()
            })
        }else {
            alert('You have to install MetaMask !')
        } 
    }
    getBalanceOfAdc(){
        let that = this
        MyWeb3.getBalanceOfAdc().then(function(result){
            console.log('getBalanceOfAdc:'+result);
            that.setState({adcBalance:result/1000000000000000000});
        })
    }
    getPendingAdc(){
        let that = this
        MyWeb3.getEarned(0).then(function(result){
            console.log('getPendingAdc:'+result);
            that.setState({pendingAdc:result/1000000000000000000});
        })
    }    
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() { 
        return ( 
            <div className='contract-admin'>
                <dl>
                        <dt>ADC余额：</dt>
                        <dd className='lowcase'>{this.state.adcBalance}</dd>
                        <dt>Pending harvest:</dt>
                        <dd className='lowcase'>{this.state.pendingAdc}</dd>
                </dl>
            </div> 
        )
    }
}
 
export default PoolInfo;