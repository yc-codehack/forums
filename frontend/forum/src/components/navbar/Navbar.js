import React,{Component} from 'react'
import "./navbar.css"

export default class Navbar extends Component {

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
                            <form action="/action_page.php">
                                <input type="text" placeholder="Search.." name="search"></input>
                                <button type="submit"><i className="fa fa-search"></i></button>
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
                                <div className="second-topusers item"> Top Users </div>
                                <div className="second-category item"> Category </div>
                                <div className="second-login item"> Login </div>
                                <div className="second-signup item">Sign Up</div>
                            </div>
                        </div>
                    </div>
                </div>
             

                
        )
    }
}
