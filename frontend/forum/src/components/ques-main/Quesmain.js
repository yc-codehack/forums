import React from 'react'
import "./quesmain.css"
import avatar from "../images/avatar.png"

export default function Quesmain() {

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
            <div className="container-sm d-flex justify-content-start mt-5" >
            <div className="card mb-3 quesmain-card" >
                    <div className="row g-0 ">
                        <div className="col-xs ml-5  mt-4 mb-4 ">
                            <div className="quesmain-startline "  ></div>
                        </div>
                        <div className="col-sm text-col" >
                        <div className="card-body overflow-hidden ">
                            <h5 className="card-title quesmain-title question overflow-hidden text-left" >What is YOur name ?</h5>
                            
                            <div className="card-foot">
                                <div className="user">
                                    <p className="card-text text-left username"><small className="text-muted">Posted by websudo</small></p>
                                    <img className=" avatar " src={avatar} />
                                </div>
                                
                                <p className="card-text text-left time"><small className="text-muted">5 days ago</small></p>
                            </div>
                        </div>
                        </div>
                    </div>


                    <hr></hr>


                    <div className="row g-0 ">
                        <div className="col-xs ml-5 mr-2 mt-2 vote-col">
                            <div className="row-md-1 arrow "  ><i className="fa fa-arrow-up" id="up-arrow" aria-hidden="true" onClick={onClickUpArrow}></i></div>
                            <div className="row-md-1 ">55</div>
                            <div className="row-md-1 arrow" ><i className="fa fa-arrow-down" aria-hidden="true"  id="down-arrow" onClick={onClickDownArrow}></i></div>
                        </div>
                        <div className="col-xs mt-4 mb-4 ">
                            <div className="quesmain-ans-startline "  ></div>
                        </div>
                        <div className="col-sm text-col" >
                        <div className="card-body overflow-hidden ">
                            
                            <p className="card-text  answer overflow-hidden text-left " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit quam vestibulum fringilla tincidunt. 
                            Suspendisse pellentesque nulla et urna pellentesque, nec fringilla sapien maximus. Donec non fermentum diam. Cras sapien justo, suscipit eget ligula vitae, faucibus luctus
                             augue. Maecenas pellentesque ornare sapien quis sollicitudin. </p>
                            <div className="card-foot">
                                <div className="user">
                                    <p className="card-text text-left username"><small className="text-muted">Posted by websudo</small></p>
                                    <img className=" avatar " src={avatar} />
                                </div>
                                
                                <p className="card-text text-left time"><small className="text-muted">5 days ago</small></p>
                            </div>
                        </div>
                        </div>
                    </div>


                    <hr></hr>



                    <div className="row g-0 ">
                        <div className="col-xs ml-5 mr-2 mt-2 vote-col">
                            <div className="row-md-1 arrow "  ><i className="fa fa-arrow-up" id="up-arrow" aria-hidden="true" onClick={onClickUpArrow}></i></div>
                            <div className="row-md-1 ">55</div>
                            <div className="row-md-1 arrow" ><i className="fa fa-arrow-down" aria-hidden="true"  id="down-arrow" onClick={onClickDownArrow}></i></div>
                        </div>
                        <div className="col-xs mt-4 mb-4 ">
                            <div className="quesmain-ans-startline "  ></div>
                        </div>
                        <div className="col-sm text-col" >
                        <div className="card-body overflow-hidden ">
                        <p className="card-text  answer overflow-hidden text-left " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit quam vestibulum fringilla tincidunt. 
                            Suspendisse pellentesque nulla et urna pellentesque, nec fringilla sapien maximus. Donec non fermentum diam. Cras sapien justo, suscipit eget ligula vitae, faucibus luctus
                             augue. Maecenas pellentesque ornare sapien quis sollicitudin. </p>
                            <div className="card-foot">
                                <div className="user">
                                    <p className="card-text text-left username"><small className="text-muted">Posted by websudo</small></p>
                                    <img className=" avatar " src={avatar} />
                                </div>
                                
                                <p className="card-text text-left time"><small className="text-muted">5 days ago</small></p>
                            </div>
                        </div>
                        </div>
                    </div>


                    <hr></hr>



                    <div className="row g-0 ">
                        <div className="col-xs ml-5 mr-2 mt-2 vote-col">
                            <div className="row-md-1 arrow "  ><i className="fa fa-arrow-up" id="up-arrow" aria-hidden="true" onClick={onClickUpArrow}></i></div>
                            <div className="row-md-1 ">55</div>
                            <div className="row-md-1 arrow" ><i className="fa fa-arrow-down" aria-hidden="true"  id="down-arrow" onClick={onClickDownArrow}></i></div>
                        </div>
                        <div className="col-xs mt-4 mb-4 ">
                            <div className="quesmain-ans-startline "  ></div>
                        </div>
                        <div className="col-sm text-col" >
                        <div className="card-body overflow-hidden ">
                        <p className="card-text  answer overflow-hidden text-left " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit quam vestibulum fringilla tincidunt. 
                            Suspendisse pellentesque nulla et urna pellentesque, nec fringilla sapien maximus. Donec non fermentum diam. Cras sapien justo, suscipit eget ligula vitae, faucibus luctus
                             augue. Maecenas pellentesque ornare sapien quis sollicitudin. </p>
                            <div className="card-foot">
                                <div className="user">
                                    <p className="card-text text-left username"><small className="text-muted">Posted by websudo</small></p>
                                    <img className=" avatar " src={avatar} />
                                </div>
                                
                                <p className="card-text text-left time"><small className="text-muted">5 days ago</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            {/*<div className="container-sm d-flex justify-content-center mt-5" >
                <div className="card mb-3 ques-card" >
                    <div className="row g-0 ">
                        <div className="col-xs ml-5 mr-2 mt-2 vote-col">
                            <div className="row-md-1 arrow "  ><i className="fa fa-arrow-up" id="up-arrow" aria-hidden="true" onClick={onClickUpArrow}></i></div>
                            <div className="row-md-1 ">55</div>
                            <div className="row-md-1 arrow" ><i className="fa fa-arrow-down" aria-hidden="true"  id="down-arrow" onClick={onClickDownArrow}></i></div>
                        </div>
                        <div className="col-xs mt-4 mb-4 ">
                            <div className="quesmain-ans-startline "  ></div>
                        </div>
                        <div className="col-sm text-col" >
                        <div className="card-body overflow-hidden ">
                            <h5 className="card-title question overflow-hidden text-left" >What is YOur name ?</h5>
                            <p className="card-text  answer overflow-hidden text-left " >Ritik Nair</p>
                            <div className="card-foot">
                                <div className="user">
                                    <p className="card-text text-left username"><small className="text-muted">Posted by websudo</small></p>
                                    <img className=" avatar " src={avatar} />
                                </div>
                                
                                <p className="card-text text-left time"><small className="text-muted">5 days ago</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>*/}



                {/* Input bar */}

                <div className="quesmain-inputbar">
                            <form  action="/action_page.php">
                                
                                <div class="input-group quesmain-input">
                                    <span className="quesmain-uploadicon"><label  for="quesmain-fileupload" ><i className="fa fa-plus-circle"></i></label></span>
                                    <input type="file" id="quesmain-fileupload"></input>
                                    {/*<textarea class="form-control form-control-sm" aria-label="With textarea"></textarea>
                                    <span class="input-group-text">Submit</span>*/}
                                    <div className="quesmain-box">
                                        <input type="text" name=""></input>
                                        <i className="fas fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </form>
                </div>
        </div>
    )
}
