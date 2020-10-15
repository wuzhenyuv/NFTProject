import React,{Component,Fragment} from 'react'
import './static/App.css'
import Page from "./Page";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { AdminArea:()=>{return(<Fragment></Fragment>)} }
    }
    
    componentDidMount(){
        let ethereum = window.ethereum
        if (typeof  ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            ethereum.on('accountsChanged', function (accounts) {
                console.log("accountsChanged:"+accounts)
                //window.location.reload()
            })
            ethereum.on('chainChanged', function (chainId) {
                console.log("chainChanged:"+chainId)
                //window.location.reload()
            })
            ethereum.on('networkChanged', function (networkVersion) {
                console.log("networkChanged:"+networkVersion)
                //window.location.reload()
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }
    
    render() { 
        let AdminArea = this.state.AdminArea
        return (
            <Fragment>
                <Router>
                    <section className="zombies-hero no-webp block app-block-intro pt-5 pb-0">
                        <div className="container">
                            <div className="menu">
                                <ul>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?PoolInfo">首页</Link></span>
                                        </button>
                                    </li>
                                     <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?PoolMenu">菜单</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?MyNFT">NFT</Link></span>
                                        </button>
                                    </li>                                   
                                    <AdminArea></AdminArea>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="zombie-container block bg-walls no-webp">
                        <div className="container">
                            <div className="area">
                                <Route path="*" component={Page}></Route>
                            </div>
                        </div>
                    </section>
                </Router>
            </Fragment>
            );
    }
}


export default App
