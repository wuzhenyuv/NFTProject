import React, { Component } from 'react';
import MyWeb3 from './MyWeb3'

class ContractAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contractAddress:'',
            contractOwner:'',
            poolNum:888,
            allocPoint:'',
            lpToken:'',
            withUpdate:false
        }
    }
    
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof  ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                MyWeb3.owner().then(function (contractOwner) {
                    if(window.defaultAccount === contractOwner){
                        that.setState({contractOwner:contractOwner})
                        that.setState({
                            contractAddress:window.MyContract._address
                        })
                        MyWeb3.poolLength().then(function(result){
                            that.setState({poolNum:result});
                        })
                    }
                })
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }

    inputAllocPoint(event){
        this.setState({
            allocPoint:event.target.value
        })
    }

    inputLpToken(event){
        this.setState({
            lpToken:event.target.value
        })
    }

    inputWithUpdate(event){
        this.setState({
            withUpdate:event.target.value
        })
    }

    addPool(){
        console.log('allocPoint:'+this.state.allocPoint);
        console.log('lpToken:'+this.state.lpToken);
        console.log('withUpdate:'+this.state.withUpdate);
        if(this.state.allocPoint!='' && this.state.lpToken!=''){
            MyWeb3.addPool(this.state.allocPoint,this.state.lpToken,this.state.withUpdate).then(function (res) {
            console.log(res)
            window.location.reload()
        })
        }else{
            alert('必须全部填写');
        }
    }   

    render() { 
        if(window.defaultAccount === this.state.contractOwner){
            return ( 
                <div className='contract-admin'>
                    <dl>
                        <dt>合约地址</dt>
                        <dd className='lowcase'>{this.state.contractAddress}</dd>
                        <dt>已有矿池</dt>
                        <dd className='lowcase'>{this.state.poolNum}</dd>
                        <dt>分配点数</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='allocPoint'
                                value={this.state.allocPoint}
                                onChange={this.inputAllocPoint.bind(this)}>
                            </input>
                        </dd>
                        <dt>抵押代币</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='lpToken'
                                value={this.state.lpToken}
                                onChange={this.inputLpToken.bind(this)}>
                            </input>
                        </dd>
                        <dt>更新池子</dt>
                        <dd>
                            <select 
                                type="text" 
                                id='allocPoint'
                                value={this.state.withUpdate}
                                onChange={this.inputWithUpdate.bind(this)}>
                                <option value={true}>更新池子</option>
                                <option value={false}>不更新池子</option>     
                            </select>
                        </dd>
                    </dl>
                    <button className="pay-btn pay-btn-last" onClick={this.addPool.bind(this)}>
                                <span>
                                    添加矿池
                                </span>
                    </button>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}
 
export default ContractAdmin;