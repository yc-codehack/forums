import React, { useState, useEffect } from "react";
import "./Card.css";
import avatar from "../../images/avatar.png";
import { Avatar, Popover, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { questionLike, questionDislike } from "../../../actions/questions.js";

export default function Ques({ item }) {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

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

	// popover
	const [anchorElLike, setAnchorElLike] = useState(null);
	const [anchorElDislike, setAnchorElDislike] = useState(null);

	const handlePopoverOpenLike = (event) => {
		setAnchorElLike(event.currentTarget);
	};

	const handlePopoverCloseLike = () => {
		setTimeout(() => {
			setAnchorElLike(null);
		}, 500);
	};
	const handlePopoverOpenDislike = (event) => {
		setAnchorElDislike(event.currentTarget);
	};

	const handlePopoverCloseDislike = () => {
		setTimeout(() => {
			setAnchorElDislike(null);
		}, 500);
	};

	const openLike = Boolean(anchorElLike);
	const openDislike = Boolean(anchorElDislike);

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
							<div
								className="row-md-1 arrow "
								onClick={() => likeHandler(item._id)}
								onMouseEnter={handlePopoverOpenLike}
								onMouseLeave={handlePopoverCloseLike}
								aria-owns={
									openLike
										? "mouse-over-popover-like"
										: undefined
								}
							>
								<i
									className="fa fa-arrow-up"
									id="up-arrow"
									// aria-hidden="true"
								></i>
							</div>
							{/* Popover */}
							<Popover
								id="mouse-over-popover-like"
								open={openLike}
								anchorEl={anchorElLike}
								anchorOrigin={{
									vertical: "center",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "center",
									horizontal: "left",
								}}
								onClose={handlePopoverCloseLike}
								disableRestoreFocus
							>
								<Typography
									className="popover-text"
									variant="subtitle1"
								>
									{!user ? "Please Login to like" : "Likes"}
								</Typography>
							</Popover>

							<div className="row-md-1 ">
								{question.likeCount}
							</div>
							<div
								className="row-md-1 arrow"
								onClick={() => dislikeHandler(item._id)}
								onMouseEnter={handlePopoverOpenDislike}
								onMouseLeave={handlePopoverCloseDislike}
								aria-owns={
									openDislike
										? "mouse-over-popover-dislike"
										: undefined
								}
							>
								<i
									className="fa fa-arrow-down"
									id="down-arrow"
								></i>
							</div>
							<Popover
								id="mouse-over-popover-dislike"
								open={openDislike}
								anchorEl={anchorElDislike}
								anchorOrigin={{
									vertical: "center",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "center",
									horizontal: "left",
								}}
								onClose={handlePopoverCloseDislike}
								disableRestoreFocus
							>
								<Typography
									className="popover-text"
									variant="subtitle1"
								>
									{!user
										? "Please Login to dislike"
										: "Dislikes"}
								</Typography>
							</Popover>
						</div>

						<div className="col-xs mt-3 mb-3">
							<div className="ques-startline "></div>
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
