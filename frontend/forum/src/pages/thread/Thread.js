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
	Tabs,
	Tab,
} from "@material-ui/core";

import { getThread } from "../../actions/questions.js";
import { createAnswer, sortAnswer } from "../../actions/answer.js";
// import { Sort } from "../../utils/answer/sort/Sort.js";
import RichEditor from "../../components/richEditor/RichEditor.js";

const Thread = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

	const [postAnswer, setPostAnswer] = useState({ quesId: id });

	const [ansFilter, setAnsFilter] = useState(0);
	const thread = useSelector((state) => state.Thread);

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

	// tabs
	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	const handleTabChange = (event, newValue) => {
		setAnsFilter(newValue);
	};

	useEffect(() => {
		var ans;
		if (thread) {
			ans = thread.answer.slice();
			if (ansFilter === 0) {
				ans.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
				dispatch(sortAnswer(ans));
				console.log("answer=>", ans);
			} else if (ansFilter === 1) {
				ans.sort((a, b) => (a.likeCount < b.likeCount ? 1 : -1));
				dispatch(sortAnswer(ans));
				console.log("answer=>", ans);
			} else {
				ans.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
				dispatch(sortAnswer(ans));
				console.log("answer=>", ans);
			}
		}
	}, [ansFilter, dispatch]);

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
									category: thread.category,
									subcategory: thread.subcategory,
									creatorId: thread.creatorId,
									creatorName: thread.creatorName,
									creatorImage: thread.creatorImage,
								}}
							/>
							<div className="btnGrpContainer">
								{thread.answer.length ? (
									<Tabs
										indicatorColor="primary"
										value={ansFilter}
										onChange={handleTabChange}
										aria-label="simple tabs example"
									>
										<Tab label="Recent" {...a11yProps(0)} />
										<Tab label="Votes" {...a11yProps(1)} />
										<Tab label="Oldest" {...a11yProps(2)} />
									</Tabs>
								) : null}
							</div>
							<Typography className="ans__heading" variant="h5">
								{thread.answer.length
									? `${thread.answer.length} Answers`
									: "No Answers yet"}
							</Typography>
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
												creatorId: ans.creatorId,
												creatorName: ans.creatorName,
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
