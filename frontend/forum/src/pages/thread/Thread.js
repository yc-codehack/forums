import React, { useState, useEffect } from "react";
import "./Thread.css";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
import Navbar from "../../components/navbar/Navbar.js";
import ThreadCard from "../../components/ques/threadCard/ThreadCard.js";
import {
	Typography,
	ButtonGroup,
	Button,
	CircularProgress,
} from "@material-ui/core";

import { getThread } from "../../actions/questions.js";
import { createAnswer } from "../../actions/answer.js";
import RichEditor from "../../components/richEditor/RichEditor.js";

const Thread = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

	const [postAnswer, setPostAnswer] = useState({ quesId: id });

	const handleChange = (e) => {
		setPostAnswer({ ...postAnswer, ["description"]: e });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createAnswer(postAnswer));
		setPostAnswer({ quesId: id });
	};

	useEffect(() => {
		dispatch(getThread(id));
	}, [dispatch]);

	const thread = useSelector((state) => state.Thread);

	return (
		<div className="thread">
			{/* header */}
			<div className="thread__header">
				<Navbar />
			</div>
			{/* main */}
			<div className="thread__main">
				{/* left side */}
				<div className="thread__leftSide"></div>
				{/* right side */}
				<div className="thread__rightSide">
					{!thread ? (
						<CircularProgress />
					) : (
						<>
							<ThreadCard
								item={{
									type: "question",
									id: thread._id,
									title: thread.title,
									description: thread.description,
									likeCount: thread.likeCount,
									liked: thread.liked,
									disliked: thread.disliked,
									createdAt: thread.createdAt,
									creatorId: thread.creatorId,
									creatorName: thread.creatorName,
									creatorImage: thread.creatorImage,
								}}
							/>
							<Typography variant="h5">
								{thread.answer.length
									? `${thread.answer.length} Answers`
									: "No Answers yet"}
							</Typography>
							<div className="btnGrpContainer">
								{thread.answer.length ? (
									<ButtonGroup
										variant="contained"
										size="small"
										color="primary"
									>
										<Button>Votes</Button>
										<Button>Oldest</Button>
										<Button>Recent</Button>
									</ButtonGroup>
								) : null}
							</div>
							<div className="line"></div>

							{thread.answer &&
								thread.answer.map((ans) => (
									<>
										<ThreadCard
											item={{
												type: "answer",
												quesId: thread._id,
												id: ans.id,
												description: ans.description,
												likeCount: ans.likeCount,
												liked: ans.liked,
												disliked: ans.disliked,
												createdAt: ans.createdAt,
												creatorId: thread.creatorId,
												creatorName: thread.creatorName,
												creatorImage: ans.creatorImage,
											}}
										/>
										<div className="line"></div>
									</>
								))}

							<form onSubmit={handleSubmit}>
								<RichEditor
									handleChange={handleChange}
									name="answer"
									value={postAnswer.description}
								/>
								<div className="thread__answerBtn">
									<Button
										type="submit"
										variant="contained"
										color="primary"
									>
										Post
									</Button>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Thread;
