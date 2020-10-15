import Web3 from "web3";
import abi_AdcPool from './json/AdcPool.json';
import abi_AdcToken from './json/AdcToken.json';
import abi_Erc20 from './json/ERC20.json';
import abi_AdvertiseNFT from './json/AdvertiseNFT';

const AdcPool_add = '0xC2Aa3f18462b8130EaE6A023050c0437e1870f34'
const AdcToken_add = '0xc182F8B634D617e95407032A6774677A2C2532D7'
const AdvertiseNFT_add = '0x93471ee2E4aeE576e2cf0eA4Cb6FF85877EE5098'
const LinkToken_add = '0x20fe562d797a42dcb3399062ae9546cd06f63280'

function transAmount(amount){
    const num = amount * Math.pow(10, 18);
    const numAsHex = "0x" + num.toString(16);
    return numAsHex;
}

const MyWeb3 ={
    init() {
        /*
        '1': Ethereum Main Network
        '2': Morden Test network
        '3': Ropsten Test Network
        '4': Rinkeby Test Network
        '5': Goerli Test Network
        '42': Kovan Test Network
        */
        return new Promise((resolve, reject) => {
            //let currentChainId = parseInt(window.ethereum.chainId, 16)
            let ethereum = window.ethereum
            //禁止自动刷新，metamask要求写的
            ethereum.autoRefreshOnNetworkChange = false
            //开始调用metamask
            ethereum.enable().then(function (accounts) {
                //初始化provider
                let provider = window['ethereum'] || window.web3.currentProvider
                //初始化Web3
                window.web3 = new Web3(provider)
                //获取到当前以太坊网络id
                window.web3.eth.net.getId().then(function (result) {
                    let currentChainId = result
                    //设置最大监听器数量，否则出现warning
                   // window.web3.currentProvider.setMaxListeners(300)
                        //实例化合约
                        window.MyContract = new window.web3.eth.Contract(abi_AdcPool.abi,AdcPool_add)
                        window.AdcToken = new window.web3.eth.Contract(abi_AdcToken.abi,AdcToken_add)
                        window.LinkToken = new window.web3.eth.Contract(abi_Erc20.abi,LinkToken_add)
                        window.AdvertiseNFT = new window.web3.eth.Contract(abi_AdvertiseNFT.abi,AdvertiseNFT_add)
                        //获取到当前默认的以太坊地址
                        window.defaultAccount = accounts[0].toLowerCase()
                        //that.allEvents(window.MyContract)
                        resolve(true)
                })
            }).catch(function (error) {
                console.log(error)
            })
        })
    },

    //返回池子数量
    poolLength() {
        return new Promise((resolve, reject) => {
            window.MyContract.methods.poolLength().call().then(function(poolLength) {
                resolve(poolLength)
            })
        })
    },

    //获得合约拥有者地址
    owner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.owner().call().then(function(owner) {
                resolve(owner.toLowerCase())
            })
        })
    },

   //添加池子
    addPool(_allocPoint,_lpToken,_withUpdate){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.add(_allocPoint,_lpToken,_withUpdate).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },

    //返回Adc币的数量
    getBalanceOfAdc(){
        return new Promise((resolve, reject) => {
            window.AdcToken.methods.balanceOf(window.defaultAccount).call().then(function(result) {
                resolve(result)
            })
        })
    },
    
    //返回pending adward
      getEarned(_poolId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.pendingSushi(_poolId,window.defaultAccount).call().then(function(result) {
                resolve(result)
            })
        })
    },

    //返回Adc币的数量
    getBalanceOfLink(){
        return new Promise((resolve, reject) => {
            window.LinkToken.methods.balanceOf(window.defaultAccount).call().then(function(result) {
                resolve(result)
            })
        })
    },

    //Link币质押approve
    approveLink(){
        return new Promise((resolve, reject) => {
            window.LinkToken.methods.approve(AdcPool_add,transAmount(1000000)).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },

    //link质押是否approve
    getApprovalOfLink(){
        return new Promise((resolve, reject) => {
            window.LinkToken.methods.allowance(window.defaultAccount,AdcPool_add).call().then(function(result) {
                resolve(result)
            })
        })
    },    
    //质押代币
    state(_poolId,_amount){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.deposit(_poolId,transAmount(_amount)).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },

    //harvest
    harvest(_poolId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.deposit(_poolId,'0').send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },   

    //unstake
    unstake(_poolId,_amount){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.withdraw(_poolId,transAmount(_amount)).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },  

    //返回当前用户质押代币数
    getStaked(_poolId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.userInfo(_poolId,window.defaultAccount).call().then(function(result) {
                resolve(result[0])
            })
        })
    }, 

    //创建NFT
    crateAdvertiseNFT(_tokenURI,_linkURL){
        console.log("_tokenURI:"+_tokenURI);
        console.log("_linkURL:"+_linkURL);        
        return new Promise((resolve, reject) => {
            window.AdvertiseNFT.methods.crateAdvertiseNFT(_tokenURI,_linkURL).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },

    //设置交易费和手续费
    setNftFee(_useOfAdc,_nftFee){
        return new Promise((resolve, reject) => {
            window.AdvertiseNFT.methods.setAdcFee(transAmount(_useOfAdc),transAmount(_nftFee)).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })       
    },

    //返回当前账户的所有token_id
    balanceOfNFT(){
        return new Promise((resolve, reject) => {
            window.AdvertiseNFT.methods.balanceOf(window.defaultAccount).call().then(function(result) {
                resolve(result)
            })
        })
    },

    //返回当前账户
    tokenOfOwnerByIndex(_index){
        return new Promise((resolve, reject) => {
            window.AdvertiseNFT.methods.tokenOfOwnerByIndex(window.defaultAccount,_index).call().then(function(result) {
                resolve(result)
            })
        })
    },

    tokenByIndex(){
        return new Promise((resolve, reject) => {
            window.AdvertiseNFT.methods.tokenByIndex(0).call().then(function(result) {
                resolve(result)
            })
        })
    },
    
    tokenURI(_index){
       // console.log('tokenURI:'+_index);
        return new Promise((resolve, reject) => {
            window.AdvertiseNFT.methods.tokenURI(2).call().then(function(result) {
                console.log('tokenURI result:'+result);
                resolve(result)
            })
        })
    },

    //所有事件
    allEvents(){
        window.MyContract.events.allEvents({fromBlock: 0}, function(error, event){
            console.log({allEvents:event})
        }).on("connected", function(subscriptionId){
           console.log({connected_subscriptionId:subscriptionId})
        }).on('data', function(event){
           console.log({event_data:event})
        }).on('changed', function(event){
            console.log({event_changed:event})
        }).on('error', function(error, receipt) { 
            console.log({event_error:error,receipt:receipt})
        })
    }
}
    
export default MyWeb3;