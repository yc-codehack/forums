import React, { useState, useEffect } from "react";
import "./QuesList.css";
import Card from "./card/Card.js";

import { useSelector, useDispatch } from "react-redux";

import { getRecent } from "../../actions/questions.js";

// material ui
import { CircularProgress } from "@material-ui/core";

const QuesList = ({ filter, sort }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRecent());
	}, [dispatch]);

	const questions = useSelector((state) => state.questions);

	return (
		<div className="quesList">
			{!questions.length ? (
				<CircularProgress />
			) : (
				questions.map((question) => (
					<Card key={question._id} item={question} />
				))
			)}
		</div>
	);
};

export default QuesList;
