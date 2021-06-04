import React,{Component} from 'react'
import axios from "axios"
import "./navbar.css"
import {Link} from 'react-router-dom'

export default class Navbar extends Component {


    constructor(props){
        super(props);

        this.state = {
            quesstring : ""
        }
    }


    componentDidMount(){
        /*axios.get(`http://localhost/5000/question/list?filter=recent`)
        .then( res => {
            console.log( res)
        })*/

        fetch('http://localhost:5000/question/list?filter=recent', {
            method: 'GET'
        })
        .then(
            res => {
                console.log( res)
            }
        )
    }

  onHamburgerClick = () =>{
      console.log("Hamburger clicked");
      
      document.querySelector(".sidebar-list").style.width = "200px";
      document.querySelector(".item").classList.remove("deactive");
      document.querySelector(".sidebar-list-items").classList.remove("deactive");
  }
    
  onCrossClick = () =>{
    
    document.querySelector(".sidebar-list").style.width = "0px";
    document.querySelector(".sidebar-list-items").classList.add("deactive");
    document.querySelector(".item").classList.add("deactive");
  }


  onChange = (e) =>{
    this.setState({
        quesstring : e.target.value
    })
  }


  onSubmitSearch = (e) =>{

    e.preventDefault();

    axios.get(`http://localhost:5000/question/search?${this.state.quesstring}=db`)
    .then( res =>{
        if( res.data.length > 0){
            console.log("hurray")
        }

        else{
            console.log("shit");
        }
    })
    console.log( this.state.quesstring)
  }

    render(){
        return (
            
            <div id="navigationbar">
                
                    <div className="second-nav">

                        <div className="hamburger" onClick={this.onHamburgerClick}> 
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className="second-logo">
                            <a className="navbar-brand" href="#navigationbar">
                            <div>Logo</div>
                            </a>    
                        </div>

                        <div className="second-search">
                            <form onSubmit={this.onSubmitSearch} action="/action_page.php">
                                {/*<input onChange={this.onChange}type="text" placeholder="Search.." name="search"></input>
                                <button type="submit"><i className="fa fa-search"></i></button>*/}

                                <div className="navbar-box">
                                        <input onChange={this.onChange} type="text" name=""  placeholder="Search.." ></input>
                                        <button type="submit"><i className="fas fa-search" aria-hidden="true"></i></button>
                                </div>
                            </form>
                        
                        </div>
                        <div className="list">
                            <div className="second-login"> Login </div>
                            <div className="second-signup">Sign Up</div>
                        </div>
                        <div className="sidebar-list">
                            <div className="second-cross fas fa-times item" onClick={this.onCrossClick}></div>
                            <div className="sidebar-list-items">
                                <div className="second-home item"> Home  </div>
                                <div className="second-topusers item">  Top Users </div>
                                <div className="second-category item">Category </div>
                                <div className="second-login item"> Login </div>
                                <div className="second-signup item"> SignUp</div>
                            </div>
                        </div>
                    </div>
                </div>
             

                
        )
    }
}
