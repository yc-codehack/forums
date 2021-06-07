import React from "react";
import "./ListField.css";
import { Avatar } from "@material-ui/core";

function ListField({ item }) {
	try {
		const name = item.name.split(" ");
		return (
			<div className="listField">
				<Avatar
					className="listField__avatar"
					src={item.imageUrl}
					alt={item.name}
				>
					{item.name.charAt(0)}
				</Avatar>
				<div className="listField__name">
					{name.length > 1
						? name[0] + " " + name[1].charAt(0)
						: name[0]}
				</div>
				<div className="listField__score">{item.score}</div>
			</div>
		);
	} catch (error) {
		console.log(error);
		return <></>;
	}
}

export default ListField;
