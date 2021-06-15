import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import avatar from "../../images/avatar.png";
import { useDispatch } from "react-redux";
import { questionLike, questionDislike } from "../../../actions/questions.js";

// material ui
import { Avatar, Popover, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import PopupCard from "../../utils/popupCard/PopupCard";
// maertial UI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

import notLogedIn from "../../../assets/popups/notLogedIn.png";

export default function Ques({ item }) {
	console.log("card=>", item);

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

	const [question, setQuestion] = useState({ ...item });

	const [isLiked, setIsLiked] = useState(item.liked);
	const [isDisliked, setIsDisliked] = useState(item.disliked);
	// const [isLiked, setIsLiked] = useState()

	const dispatch = useDispatch();

	const likeHandler = (id) => {
		dispatch(questionLike({ type: "question", quesId: id }));

		!isLiked
			? setQuestion({
					likeCount: question.likeCount + 1,
			  })
			: setQuestion({
					likeCount: question.likeCount - 1,
			  });

		setIsLiked((prevIsLiked) => !prevIsLiked);
		setIsDisliked(false);
	};

	const dislikeHandler = (id) => {
		dispatch(questionDislike({ type: "question", quesId: id }));

		isLiked &&
			setQuestion({
				likeCount: question.likeCount - 1,
			});

		setIsDisliked((prevIsDisliked) => !prevIsDisliked);
		setIsLiked(false);
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

	const [isCardOpen, setIsCardOpen] = useState(false);

	const handlePopupOpen = () => {
		setIsCardOpen(true);
	};

	const handlePopupClose = () => {
		setIsCardOpen(false);
	};

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
								onClick={
									user
										? () => likeHandler(item._id)
										: () => handlePopupOpen()
								}
								onMouseEnter={handlePopoverOpenLike}
								onMouseLeave={handlePopoverCloseLike}
								aria-owns={
									openLike
										? "mouse-over-popover-like"
										: undefined
								}
							>
								<ArrowUpwardIcon
									classNam="UpArrow"
									htmlColor={isLiked ? "#4a5edf" : "#333333"}
								/>
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
								onClick={
									user
										? () => dislikeHandler(item._id)
										: () => handlePopupOpen()
								}
								onMouseEnter={handlePopoverOpenDislike}
								onMouseLeave={handlePopoverCloseDislike}
								aria-owns={
									openDislike
										? "mouse-over-popover-dislike"
										: undefined
								}
							>
								<ArrowDownward
									htmlColor={
										isDisliked ? "#db3c30" : "#333333"
									}
								/>
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
									{user &&
										user.result._id === item.creatorId && (
											<i class="fas fa-trash-alt  delete-icon"></i>
										)}
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

										<Avatar
											className="avatar"
											src={item.creatorImage}
											alt={item.creatorName}
										>
											{item.creatorName &&
												item.creatorName.charAt(0)}
										</Avatar>
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
			<Dialog
				open={isCardOpen}
				onClose={handlePopupClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"You are not signed in"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<img src={notLogedIn} alt="" />
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handlePopupClose} color="primary">
						Close
					</Button>
					<Button
						color="primary"
						// onClick={handlePopupClose}
						variant="contained"
						autoFocus
						component={Link}
						to="/auth"
					>
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
