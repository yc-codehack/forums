import React from "react";
import "./DivideOrLine.css";

const DivideOrLine = ({ color }) => {
	console.log(color);
	return (
		<div className="divideOrLine">
			<div className="divideOrLine__line"></div>
			<div
				className="divideOrLine__text"
				style={{ backgroundColor: color }}
			>
				or
			</div>
		</div>
	);
};

export default DivideOrLine;
