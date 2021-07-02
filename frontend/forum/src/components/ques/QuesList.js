import React, { useState, useEffect, useRef, useCallback } from "react";
import "./QuesList.css";
import Card from "./newCard/Card.js";

import { useSelector, useDispatch } from "react-redux";

import { getRecent, getCategoryQuestion } from "../../actions/questions.js";

// material ui
import {
	CircularProgress,
	Typography,
	LinearProgress,
} from "@material-ui/core";

const QuesList = ({ filter, sort }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);

	// 🡻 useRef is used to store data in between the renders
	const observer = useRef();

	const lastQuestionElementRef = useCallback(
		(node) => {
			console.log("ques list 1==>", node);
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					console.log("QuesList visible");
				}
			});
			if (node) {
				observer.current.observer(node);
			}
		},
		[isLoading]
	);

	useEffect(() => {
		setIsLoading(true);
		filter
			? dispatch(
					getCategoryQuestion({
						filterInfo: filter,
						sortInfo: sort,
						page: page,
						limit: limit,
					})
			  )
			: dispatch(getRecent({ page: page, limit: limit }));
	}, [dispatch, filter, sort, page, limit]);

	const questions = useSelector((state) => state.Question);
	useEffect(() => {
		if (questions.next.page === null) {
			setIsLoading(false);
		}
	}, [questions]);
	return (
		<div className="quesList">
			{!questions.result.length ? (
				<CircularProgress />
			) : (
				questions.result.map((item, index) => {
					if (questions.result.length == index + 1) {
						return (
							<Card
								ref={(node) => {
									lastQuestionElementRef(node);
								}}
								key={item._id}
								item={item}
							/>
						);
					} else {
						return <Card key={item._id} item={item} />;
					}
				})
			)}
			{questions.result.length && isLoading ? (
				<>
					<Typography variant="h5">Loading...</Typography>
					<LinearProgress />
				</>
			) : (
				<Typography variant="h5">You are all caught up!</Typography>
			)}
		</div>
	);
};

export default QuesList;
