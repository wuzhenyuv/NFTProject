import React, { Component } from 'react';
import PoolInfo  from "./PoolInfo"
import PoolMenu from "./PoolMenu"
import MyNFT from "./MyNFT"
import ContractAdmin from "./ContractAdmin"

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {page:'',id:0 }
    }
    componentDidMount(){
        let search = this.props.location.search.replace(/\?/,'').split("&")
        let page = search[0]
        this.setState({page:page})
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            this.setState({nextProps})
            let search = nextProps.location.search.replace(/\?/,'').split("&")
            let page = search[0] === '' ?  'PoolInfo' : search[0]
            this.setState({page:page})
            return true
        }else{
            return false
        }
    }
    render() { 
        switch (this.state.page){
            case 'PoolInfo':
                return(<PoolInfo></PoolInfo>)
            case 'PoolMenu':
                return(<PoolMenu></PoolMenu>)
            case 'MyNFT':
                    return(<MyNFT></MyNFT>)    
            case 'ContractAdmin':
                return(<ContractAdmin></ContractAdmin>)
            default:
                return(<PoolInfo></PoolInfo>)
        }
    }
}
 
export default Page;