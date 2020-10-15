import React, { Component } from 'react'
import './static/ZombiePreview.css';
import MyWeb3 from './MyWeb3'
import {
    BrowserRouter as 
    Route,
    Link
  } from "react-router-dom"
import Page from "./Page";

class PoolMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { adcBalance:888,
                       linkBalance: 888,
                       isApproveLink:0,
                       lpToken:0,
                       stakeBalance:0
                     }
    }
        
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                that.getBalanceOfAdc()
                that.getBalanceOfLink()
                that.getApprovalOfLink()
                that.getStaked()
            })
        }else {
            alert('You have to install MetaMask !')
        } 
    }
    getBalanceOfAdc(){
        let that = this
        MyWeb3.getBalanceOfAdc().then(function(result){
            console.log('adc result:'+result);
            that.setState({linkBalance:result});
        })
    }
    getBalanceOfLink(){
        let that = this
        MyWeb3.getBalanceOfLink().then(function(result){
            console.log('link result:'+result);
            that.setState({linkBalance:result/1000000000000000000});
        })
    }
    getStaked(){
        let that = this
        MyWeb3.getStaked(0).then(function(result){
            console.log('getStaked result:'+result);
            that.setState({stakeBalance:result/1000000000000000000});
        })
    }
    getApprovalOfLink(){
        let that = this
        MyWeb3.getApprovalOfLink().then(function(result){
            console.log('link approval:'+result);
            that.setState({isApproveLink:result});
        })       
    }
    approveLink(){
         MyWeb3.approveLink().then(function (res) {
         console.log('approveLink:'+res)
         window.location.reload()
        });
    }
    inputLpToken(event){
        this.setState({
            lpToken:event.target.value
        })
    }
    stake(){
        if(this.state.lpToken>0 && this.state.lpToken<=this.state.linkBalance){
            MyWeb3.state(0,this.state.lpToken).then(function (res) {
                console.log('stake:'+res)
                window.location.reload()
               });
        }else{
            alert('数量不符合要求')
        }
    }
    harvest(){
        MyWeb3.harvest(0).then(function (res) {
            console.log('harvest:'+res)
            window.location.reload()
           });        
    }
    unstake(){
        MyWeb3.unstake(0,this.state.stakeBalance).then(function (res) {
            console.log('unstake:'+res)
            window.location.reload()
           });        
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() { 
        if(this.state.isApproveLink>0 && this.state.stakeBalance>0){
        return ( 
            <div className='contract-admin'>
                 <div><h2>Link池</h2></div>
                 <div>质押link获取Adc代币</div>
                 <br/>
                 <div>我的link币余额：{this.state.linkBalance}</div>
                 <div>我的质押数：{this.state.stakeBalance}</div>
                 <br/>
                 <div >
                 <input 
                                type="text" 
                                id='lpToken'
                                value={this.state.lpToken}
                                onChange={this.inputLpToken.bind(this)}>
                            </input>
                 </div>
                 <div>
                 <button className="pay-btn pay-btn-last" onClick={this.stake.bind(this)}>
                                <span>
                                    质押代币
                                </span>
                    </button>
                    <br/>
                    <button className="pay-btn pay-btn-last" onClick={this.harvest.bind(this)}>
                                <span>
                                    收割ADC
                                </span>
                    </button>
                    <button className="pay-btn pay-btn-last" onClick={this.unstake.bind(this)}>
                                <span>
                                    退出质押
                                </span>
                    </button>
                 </div>
                 <div>

                 </div>
            </div> 
        )
        }else if(this.state.isApproveLink>0){
            return ( 
                <div className='contract-admin'>
                 <div><h2>Link池</h2></div>
                 <div>质押link获取Adc代币</div>
                     <br/>
                     <div>我的link币余额：{this.state.linkBalance}</div>
                     <div>我的质押数：{this.state.stakeBalance}</div>
                     <br/>
                     <div >
                     <input 
                                    type="text" 
                                    id='lpToken'
                                    value={this.state.lpToken}
                                    onChange={this.inputLpToken.bind(this)}>
                                </input>
                     </div>
                     <div>
                     <button className="pay-btn pay-btn-last" onClick={this.stake.bind(this)}>
                                    <span>
                                        质押代币
                                    </span>
                        </button>
                     </div>
                     <div>
    
                     </div>
                </div> 
            )
        
        }else{
        return ( 
            <div className='contract-admin'>
                 <div><h2>Link池</h2></div>
                 <div>质押link获取Adc代币</div>
                 <br/>
                 <div>我的link币余额：{this.state.linkBalance}</div>
                 <br/>
                 <div >
                    <button className="pay-btn pay-btn-last" onClick={this.approveLink.bind(this)}>
                        <span>批准质押Link</span>
                    </button>
                 </div>
                 <div>

                 </div>
            </div> 
        )
        }
    }
}
 
export default PoolMenu;