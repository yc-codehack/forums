import React, { useState, useEffect } from "react";

import "./CategoryList.css";

import Card from "../card/Card.js";
import { useSelector, useDispatch } from "react-redux";
//
import { CircularProgress } from "@material-ui/core";

import { getCategory } from "../../../actions/extra.js";

const Category = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategory());
	}, [dispatch]);

	const category = useSelector((state) => state.list);

	return (
		<div className="categoryList">
			{!category.length ? (
				<CircularProgress />
			) : (
				category.map((item) => <Card key={item._id} item={item} />)
			)}
		</div>
	);
};
export default Category;
