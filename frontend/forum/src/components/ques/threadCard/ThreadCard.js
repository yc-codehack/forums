import { Typography, Avatar, IconButton, Popover } from "@material-ui/core";
import React, { useState } from "react";
import "./ThreadCard.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// icons
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import {
	threadQuesLike,
	threadQuesDislike,
	questionDelete,
} from "../../../actions/questions.js";
import { answerDelete } from "../../../actions/answer";
import InnerHTML from "dangerously-set-html-content";

const ThreadCard = ({ item }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [data, setData] = useState({ ...item });
	// console.table("threadCard", data);

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

	const [isLiked, setIsLiked] = useState(item.liked);
	const [isDisliked, setIsDisliked] = useState(item.disliked);

	const likeHandler = () => {
		item.type === "question"
			? dispatch(threadQuesLike({ type: item.type, quesId: item.id }))
			: dispatch(
					threadQuesLike({
						type: item.type,
						quesId: item.quesId,
						ansId: item.id,
					})
			  );
		setIsLiked((prevIsLiked) => !prevIsLiked);
		setIsDisliked(false);
	};
	const dislikeHandler = () => {
		item.type === "question"
			? dispatch(threadQuesDislike({ type: item.type, quesId: item.id }))
			: dispatch(
					threadQuesDislike({
						type: item.type,
						quesId: item.quesId,
						ansId: item.id,
					})
			  );

		setIsDisliked((prevIsDisliked) => !prevIsDisliked);
		setIsLiked(false);
	};

	// delete
	const handleDelete = () => {
		if (item.type === "question") {
			dispatch(questionDelete({ type: item.type, quesId: item.id }));
			history.push("/");
		} else {
			dispatch(
				answerDelete({
					type: item.type,
					quesId: item.quesId,
					ansId: item.id,
				})
			);
		}
	};

	// popup
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
		<div className="threadCard">
			{item.type === "question" && (
				<div className="threadCard__title">
					<Typography variant="h5" align="left" gutterBottom>
						{item.title}
					</Typography>
				</div>
			)}
			<div className="threadCard__creator">
				<div className="threadCard__creatorAvatar">
					<Avatar src={item.creatorImage} alt={item.creatorName}>
						{item.creatorName.charAt(0)}
					</Avatar>
				</div>
				<div className="threadCard__creatorInfo">
					<Typography
						className="threadCard__creatorInfoName"
						variant="subtitle1"
					>
						{item.creatorName}
					</Typography>
					<Typography
						className="threadCard__creatorInfoDate"
						variant="caption"
					>
						{moment(item.createdAt).fromNow()}
					</Typography>
				</div>
			</div>
			<div className="threadCard__description">
				<Typography variant="body1">
					{item.description.charAt(0) === "<" ? (
						<InnerHTML html={item.description} />
					) : (
						item.description
					)}
				</Typography>
			</div>
			<div className="threadCard__footer">
				<div className="threadCard__footerInteraction">
					<IconButton>
						<ThumbUpAltIcon
							onClick={
								user
									? () => likeHandler(item._id)
									: () => handlePopupOpen()
							}
							onMouseEnter={handlePopoverOpenLike}
							onMouseLeave={handlePopoverCloseLike}
							aria-owns={
								openLike ? "mouse-over-popover-like" : undefined
							}
							className="thumbUpIcon"
							htmlColor={isLiked ? "#4a5edf" : "#333333"}
						/>
					</IconButton>
					<Popover
						id="mouse-over-popover-like"
						open={openLike}
						anchorEl={anchorElLike}
						anchorOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						onClose={handlePopoverCloseLike}
						disableRestoreFocus
					>
						<Typography
							className="popover-text"
							variant="subtitle1"
						>
							{!user ? "Please login to like" : "Likes"}
						</Typography>
					</Popover>
					<Typography variant="caption">
						{item.likeCount ? item.likeCount : 0}
					</Typography>
					<IconButton>
						<ThumbDownAltIcon
							className="thumbDownIcon"
							onClick={
								user
									? () => dislikeHandler(item.id)
									: () => handlePopupOpen()
							}
							onMouseEnter={handlePopoverOpenDislike}
							onMouseLeave={handlePopoverCloseDislike}
							aria-owns={
								openDislike
									? "mouse-over-popover-dislike"
									: undefined
							}
							htmlColor={isDisliked ? "#db3c30" : "#333333"}
						/>
					</IconButton>
					<Popover
						id="mouse-over-popover-dislike"
						open={openDislike}
						anchorEl={anchorElDislike}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						onClose={handlePopoverCloseDislike}
						disableRestoreFocus
					>
						<Typography
							className="popover-text"
							variant="subtitle1"
						>
							{!user ? "Please login to dislike" : "Dislikes"}
						</Typography>
					</Popover>
				</div>
				<div className="threadCard__footerOptions">
					{user && user.result._id === item.creatorId && (
						<>
							<IconButton
								aria-label="delete"
								onClick={handleDelete}
							>
								<DeleteIcon />
							</IconButton>
							<IconButton>
								<EditIcon />
							</IconButton>
						</>
					)}
					{item.type === "question" && (
						<IconButton>
							<ShareIcon />
						</IconButton>
					)}
				</div>
			</div>
		</div>
	);
};

export default ThreadCard;
