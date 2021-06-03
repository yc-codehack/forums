import React from "react";

import Card from "./card/Card.js";
import { useSelector } from "react-redux";
//
import { CircularProgress } from "@material-ui/core";

const Category = () => {
	const category = useSelector((state) => state.list);

	console.log(category);

	return !category.length ? (
		<CircularProgress />
	) : (
		category.map((item) => <Card key={item._id} item={item} />)
	);
};
export default Category;
