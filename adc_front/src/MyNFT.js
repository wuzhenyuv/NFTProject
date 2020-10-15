import React, { Component } from 'react';
import MyWeb3 from './MyWeb3'

class MyNFT extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nftNum:0,
            tokenURL:'',
            linkURL:''
        }
    }
    
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                 that.balanceOfNFT()
                 that.tokenByIndex()
                // that.getBalanceOfLink()
                // that.getApprovalOfLink()
                // that.getStaked()
            })
        }else {
            alert('You have to install MetaMask !')
        } 
    }

    inputTokenURL(event){
        this.setState({
            tokenURL:event.target.value
        })
    }

    inputLinkURL(event){
        this.setState({
            linkURL:event.target.value
        })
    }

    createNFT(){
        console.log();
        if(this.state.tokenURL!='' && this.state.linkURL!=''){
            MyWeb3.crateAdvertiseNFT(this.state.tokenURL,this.state.linkURL).then(function (res) {
            console.log(res)
            window.location.reload()
        })
        }else{
            alert('必须全部填写');
        }
    }   

    balanceOfNFT(){
        let that = this
        let tokenId = 0
        MyWeb3.balanceOfNFT().then(function(result){
            console.log('balanceOfNFT result:'+result);
            that.setState({nftNum:result});
        })
       // if(this.state.nftNum>0){
            MyWeb3.tokenOfOwnerByIndex(1).then(function(result){
            console.log('tokenOfOwnerByIndex result:'+result);
            tokenId =result   
            })
       // }
        MyWeb3.tokenURI(1).then(function(result){
            console.log('tokenURIeeee result:'+result);
            that.setState({tokenURL:result});
        })       
    }

    tokenByIndex(){
        MyWeb3.tokenByIndex().then(function(result){
            console.log('tokenByIndex result:'+result);
        })
    }

    render() { 
            return ( 
                <div className='contract-admin'>
                    <img src={this.state.tokenURL}/>
                    <dl>
                        <dt>已有NFT数量</dt>
                        <dd className='lowcase'></dd>
                        <dt>设置tokenURL</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='tokenURL'
                                value={this.state.tokenURL}
                                onChange={this.inputTokenURL.bind(this)}>
                            </input>
                        </dd>
                        <dt>设置linkURL</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='linkURL'
                                value={this.state.linkURL}
                                onChange={this.inputLinkURL.bind(this)}>
                            </input>
                        </dd>
                    </dl>
                    <button className="pay-btn pay-btn-last" onClick={this.createNFT.bind(this)}>
                                <span>
                                    创建NFT
                                </span>
                    </button>
                    
                </div>
            )
    }
}
 
export default MyNFT;