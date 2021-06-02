import React, { useState } from "react";
import "./card.css";
import Ques from "./ques/Ques";

import { useSelector } from "react-redux";

// material ui
import { CircularProgress } from "@material-ui/core";

const Card = () => {
	const questions = useSelector((state) => state.questions);

	console.log(questions);

	return !questions.length ? (
		<CircularProgress />
	) : (
		questions.map((question) => <Ques key={question._id} item={question} />)
	);
};

export default Card;
