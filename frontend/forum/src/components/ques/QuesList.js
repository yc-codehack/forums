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
	const [hasMore, setHasMore] = useState(true);

	const questions = useSelector((state) => state.Question);
	// 🡻 useRef is used to store data in between the renders
	const observer = useRef();

	const lastQuestionElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage(questions.next.page);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
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

	useEffect(() => {
		if (questions.next.page === null) {
			setIsLoading(false);
			setHasMore(false);
		} else {
			setIsLoading(false);
			setHasMore(true);
		}
	}, [questions]);

	console.log("quesList", questions);
	// useEffect(() => {

	// }, [questions]);

	return (
		<div className="quesList">
			{!questions.result.length ? (
				<CircularProgress />
			) : (
				questions.result.map((item, index) => {
					if (questions.result.length === index + 1) {
						return (
							<>
								<Card item={item} />
								<div
									ref={lastQuestionElementRef}
									key={item._id}
									value={index}
								></div>
							</>
						);
					} else {
						return <Card item={item} />;
					}
				})
			)}
			{questions.result.length &&
				(isLoading ? (
					<>
						<Typography variant="h5">Loading...</Typography>
						<LinearProgress />
					</>
				) : (
					<Typography variant="h5">You are all caught up!</Typography>
				))}
		</div>
	);
};

export default QuesList;
