import React, { useState, useEffect } from "react";
import "./ques.css";
import avatar from "../../images/avatar.png";

import { useDispatch } from "react-redux";
import { questionLike, questionDislike } from "../../../actions/questions.js";

export default function Ques({ item }) {
	/* 
        ? Under review 
    */
	console.log(item);
	// function onClickUpArrow(e) {
	// 	console.log(e.target.parentNode.nextSibling.nextSibling);

	// 	if (e.target.classList.contains("up-arrow-color") === true) {
	// 		e.target.classList.remove("up-arrow-color");
	// 	} else {
	// 		e.target.classList.add("up-arrow-color");
	// 		let down =
	// 			e.target.parentNode.nextSibling.nextSibling.querySelector(
	// 				"#down-arrow"
	// 			);
	// 		if (down.classList.contains("down-arrow-color") === true) {
	// 			down.classList.remove("down-arrow-color");
	// 			console.log("hello");
	// 		}
	// 	}
	// }

	// function onClickDownArrow(e) {
	// 	console.log(e.target.parentNode.previousSibling.previousSibling);

	// 	if (e.target.classList.contains("down-arrow-color") === true) {
	// 		e.target.classList.remove("down-arrow-color");
	// 	} else {
	// 		e.target.classList.add("down-arrow-color");
	// 		let up =
	// 			e.target.parentNode.previousSibling.previousSibling.querySelector(
	// 				"#up-arrow"
	// 			);
	// 		console.log(up);
	// 		if (up.classList.contains("up-arrow-color") === true) {
	// 			up.classList.remove("up-arrow-color");
	// 			console.log("hello");
	// 		}
	// 	}
	// }

	const [question, setQuestion] = useState({ ...item });

	const dispatch = useDispatch();

	const likeHandler = (id) => {
		dispatch(questionLike({ type: "question", quesId: id }));
		setQuestion({
			likeCount: question.likeCount + 1,
		});
	};

	const dislikeHandler = (id) => {
		dispatch(questionDislike({ type: "question", quesId: id }));
	};

	const getPostion = (el) =>{
		console.log(el)

	
		var xPos = 0;
		var yPos = 0;
	   
		while (el) {
		  if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;
	   
			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
			console.log("if")
		  } else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			console.log("else")

		  }
	   
		  el = el.offsetParent;
		}
		return {
		  x: xPos,
		  y: yPos
		};

	}


	const popUpHandler = (e) =>{
		const pos = getPostion(e.target);
		console.log( pos.x , pos.y)
		document.querySelector(".popup").style.top = `${pos.y - 8}px`;
		document.querySelector(".popup").style.left = `${pos.x + 20}px`;
		console.log( `Top:- ${document.querySelector(".popup").style.top}`)
		console.log( `Left:- ${document.querySelector(".popup").style.left}`)
		document.querySelector(".popup").classList.add("active")

		setTimeout(function(){ document.querySelector(".popup").classList.remove("active"); }, 1500);
	}

	return (
		<div>
			<div
				className="container-sm d-flex justify-content-center "
				key={item._id}
			>
				<div className="card popup">
							<p>Please Login!</p>
						</div>
				<div className="card mb-3 ques-card">
					<div className="row g-0 ">
						<div className="col-xs ml-5 mr-2 mt-2 vote-col">
							<div className="row-md-1 arrow ">
								<i
									className="fa fa-arrow-up"
									id="up-arrow"
									aria-hidden="true"
									//onClick={() => likeHandler(item._id)}
									// onClick={onClickUpArrow}
									onClick={popUpHandler}
								></i>
							</div>
							<div className="row-md-1 ">
								{question.likeCount}
							</div>
							<div className="row-md-1 arrow">
								<i
									className="fa fa-arrow-down"
									aria-hidden="true"
									id="down-arrow"
									//onClick={() => dislikeHandler(item._id)}
									onClick={popUpHandler}
								></i>
							</div>
							
						</div>


						

						<div className="col-xs mt-3 mb-3">
							<div className="ques-startline "  ></div>
						</div>
						<div className="col-sm text-col">
							<div className="card-body overflow-hidden ">
								<div className="title-box">
								<h5 className="card-title question overflow-hidden text-left">
									{item.title}
								</h5>
								<i class="fas fa-trash-alt  delete-icon"></i>
								</div>
								<p className="card-text  answer overflow-hidden text-left ">
									{item.description}
								</p>
								<div className="card-foot">
									<div className="user">
										<p className="card-text text-left username">
											<small className="text-muted">
												Posted by {item.creatorName}
											</small>
										</p>
										<img
											className=" avatar "
											src={avatar}
											alt=""
										/>
									</div>

									<p className="card-text text-left time">
										<small className="text-muted">
											{item.createdAt}
										</small>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
