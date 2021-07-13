import React, { useState, useEffect, useRef, useCallback } from "react";
import "./QuesList.css";
import Card from "./newCard/Card.js";

import { useSelector, useDispatch } from "react-redux";

import { getRecent, getCategoryQuestion } from "../../actions/questions.js";

import { SelectBox } from "../utils/input/Input";
// material ui
import {
	CircularProgress,
	Typography,
	LinearProgress,
} from "@material-ui/core";

const QuesList = ({ filter, sort, sortInfo }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [hasMore, setHasMore] = useState(true);

	const [sortValue, setSortValue] = useState("Recent");

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
			: sortValue === "Recent"
			? dispatch(getRecent({ page: page, limit: limit }))
			: dispatch(
					getRecent({
						page: page,
						limit: limit,
						sort: "likeCount",
						sortInfo: sortValue == "Increasing likes" ? -1 : 1,
					})
			  );
	}, [dispatch, filter, sort, page, limit, sortValue]);

	useEffect(() => {
		if (questions.next.page === null) {
			setIsLoading(false);
			setHasMore(false);
		} else {
			setIsLoading(false);
			setHasMore(true);
		}
	}, [questions]);

	// filters
	const handleSortChange = (e) => {
		setSortValue(e.target.value);
	};

	useEffect(() => {}, [sortValue]);

	return (
		<div className="quesList">
			{questions.result.length && !filter && (
				<div class="filter">
					<div className="filter__wrapper">
						<SelectBox
							autoWidth
							name="filter"
							label=""
							variant="outlined"
							menuArray={[
								"Recent",
								"Increasing likes",
								"Decreasing likes",
							]}
							size="small"
							handleChange={handleSortChange}
							value={sortValue}
						/>
					</div>
				</div>
			)}
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
