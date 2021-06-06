import React from "react";
import "./Loading.css";

import { CircularProgress, Backdrop } from "@material-ui/core";

const Loading = ({ text, height, width }) => {
	return (
		<Backdrop className="loading" open="true">
			<div className="loading__wrapper">
				<CircularProgress color="primary" />
				<h4>{text}</h4>
			</div>
		</Backdrop>
	);
};

export default Loading;
