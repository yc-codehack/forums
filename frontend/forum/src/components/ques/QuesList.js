import React, { useState, useEffect } from "react";
import "./QuesList.css";
import Card from "./newCard/Card.js";

import { useSelector, useDispatch } from "react-redux";

import { getRecent, getCategoryQuestion } from "../../actions/questions.js";

// material ui
import { CircularProgress, Typography } from "@material-ui/core";

const QuesList = ({ filter, sort }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		filter
			? dispatch(
					getCategoryQuestion({ filterInfo: filter, sortInfo: sort })
			  )
			: dispatch(getRecent({ page: 1, limit: 5 }));
	}, [dispatch, filter, sort]);

	const questions = useSelector((state) => state.Question);
	// console.log("questions", questions && questions.result);
	// console.log("questions", questions && questions.result.length);

	return (
		<div className="quesList">
			{!questions.result.length ? (
				<CircularProgress />
			) : (
				questions.result.map((item) => (
					<Card key={item._id} item={item} />
				))
			)}
		</div>
	);
};

export default QuesList;
