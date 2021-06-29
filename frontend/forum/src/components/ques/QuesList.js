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
			: dispatch(getRecent());
	}, [dispatch, filter, sort]);

	const questions = useSelector((state) => state.Question);

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
