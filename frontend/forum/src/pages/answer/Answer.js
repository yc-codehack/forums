
import React, { useState } from 'react';
// components
import Navbar from "../../components/navbar/Navbar.js";
import Ques from "../../components/card/ques/Ques"
import Ans from "../../components/card/ans/Ans"
import Textbox from "../../components/card/textbox/Textbox"
import Quesmain from "../../components/ques-main/Quesmain"
import Menucard from "../../components/menucard/Menucard"


function Answer() {


    const [tasks, setTasks] = useState([
        {
            _id : 1,
            title : "Do homework",
            decription : "dadasdadas",
            creatorName : "dsdsdsds",
            createdAt  : "5D"
        },
    ]);


	return (
		<div className="answer-page" >
            <Navbar />
            <div className="mt-5">
                <Ques item={tasks[0]} />
                <div className="" style={{ color :"black" , fontSize : "24px"}}> 
                    Answers ... 
                </div>
                <hr style={{width : "50%", maxWidth : "650px",  border: "none",  height: "8px", background : "black"}}></hr>
                <Ans />
                <Textbox />
            </div>
		</div>
	);
}

export default Answer;
