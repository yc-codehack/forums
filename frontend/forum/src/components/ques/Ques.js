import React from 'react'
import "./ques.css"
import avatar from "../images/avatar.png"

export default function Ques({item}) {

    /* 
        ? Under review 
    */

    function onClickUpArrow(e){
                
        console.log(e.target.parentNode.nextSibling.nextSibling)
       
            if(e.target.classList.contains("up-arrow-color") === true ){
                e.target.classList.remove("up-arrow-color")
            }
            else {
                e.target.classList.add("up-arrow-color")
                let down = e.target.parentNode.nextSibling.nextSibling.querySelector("#down-arrow")
                if(down.classList.contains("down-arrow-color") === true){
                    down.classList.remove("down-arrow-color")
                    console.log("hello")
                }

            }
         }


    function onClickDownArrow(e){
        
        console.log(e.target.parentNode.previousSibling.previousSibling)

            if(e.target.classList.contains("down-arrow-color") === true ){
                e.target.classList.remove("down-arrow-color")
            }
            else {
                e.target.classList.add("down-arrow-color")
                let up = e.target.parentNode.previousSibling.previousSibling.querySelector("#up-arrow")
                console.log(up);
                if(up.classList.contains("up-arrow-color") === true){
                    up.classList.remove("up-arrow-color")
                    console.log("hello")
                }
            }
    }

    return (
        <div>
            <div className="container-sm d-flex justify-content-center " key={item.id}>
                <div className="card mb-3 ques-card" >
                    <div className="row g-0 ">
                        <div className="col-xs ml-5 mr-2 mt-2 vote-col">
                            <div className="row-md-1 arrow "  ><i className="fa fa-arrow-up" id="up-arrow" aria-hidden="true" onClick={onClickUpArrow}></i></div>
                            <div className="row-md-1 ">{item.vote}</div>
                            <div className="row-md-1 arrow" ><i className="fa fa-arrow-down" aria-hidden="true"  id="down-arrow" onClick={onClickDownArrow}></i></div>
                        </div>
                        <div className="col-sm text-col" >
                        <div className="card-body overflow-hidden ">
                            <h5 className="card-title question overflow-hidden text-left" >{item.question}</h5>
                            <p className="card-text  answer overflow-hidden text-left " >{item.answer}</p>
                            <div className="card-foot">
                                <div className="user">
                                    <p className="card-text text-left username"><small className="text-muted">Posted by {item.username}</small></p>
                                    <img className=" avatar " src={avatar} />
                                </div>
                                
                                <p className="card-text text-left time"><small className="text-muted">{item.time}</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    )
}
