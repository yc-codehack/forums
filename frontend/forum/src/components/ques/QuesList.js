import React, { useState, useEffect } from "react";
import "./QuesList.css";
import Card from "./newCard/Card.js";

import { useSelector, useDispatch } from "react-redux";

import { getRecent } from "../../actions/questions.js";

// material ui
import { CircularProgress } from "@material-ui/core";

const QuesList = ({ filter, sort }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRecent());
	}, [dispatch]);

	const questions = useSelector((state) => state.Question);
	console.log(questions);

	return (
		<div className="quesList">
			{!questions.length ? (
				<CircularProgress />
			) : (
				questions.map((item) => <Card key={item._id} item={item} />)
			)}
		</div>
	);
};

export default QuesList;
