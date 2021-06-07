import React, { useState, useEffect } from "react";
import "./Card.css";
import avatar from "../../images/avatar.png";

import { useDispatch } from "react-redux";
import { questionLike, questionDislike } from "../../../actions/questions.js";

// material ui
import { Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Card = ({ item }) => {
	/* 
        ? Under review 
    */

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

	const [question, setQuestion] = useState({
		item,
	});
	console.log("item=>", item);

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

	console.log("question=>", question);
	return (
		<div>
			<div
				className="container-sm d-flex justify-content-center "
				key={question.item._id}
			>
				<div className="card mb-3 ques-card">
					<div className="row g-0 ">
						<div className="col-xs ml-5 mr-2 mt-2 vote-col card__left">
							<div className="row-md-1 arrow ">
								{/* <i
									className="fa fa-arrow-up"
									id="up-arrow"
									aria-hidden="true"
									onClick={() => likeHandler(item._id)}
									// onClick={onClickUpArrow}
								></i> */}
								<ArrowUpwardIcon
									className="upArrow"
									onClick={() =>
										likeHandler(question.item._id)
									}
								/>
							</div>
							<div className="row-md-1 ">
								{question.item.likeCount}
							</div>
							<div className="row-md-1 arrow">
								{/* <i
									className="fa fa-arrow-down"
									aria-hidden="true"
									id="down-arrow"
									onClick={() => dislikeHandler(item._id)}
								></i> */}
								<ArrowDownwardIcon
									className="downArrow"
									onClick={() =>
										dislikeHandler(question.item._id)
									}
								/>
							</div>
						</div>
						<div className="col-sm text-col card__right">
							<div className="card-body overflow-hidden ">
								<h5 className="card-title question overflow-hidden text-left">
									{question.item.title}
								</h5>
								<p className="card-text  answer overflow-hidden text-left ">
									{question.item.description}
								</p>
								<div className="card-foot">
									<div className="user">
										<p className="card-text text-left username">
											<small className="text-muted">
												Posted by{" "}
												{question.item.creatorName
													? question.item.creatorName
													: "H"}
											</small>
										</p>

										<div className="card__rightFootAvatar">
											<Avatar
												src={question.item.creatorImage}
												alt={question.item.creatorName}
											>
												{question.item.creatorName
													? question.item.creatorName.charAt(
															0
													  )
													: "H"}
											</Avatar>
										</div>
									</div>

									<p className="card-text text-left time">
										<small className="text-muted">
											{question.item.createdAt}
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
};

export default Card;
