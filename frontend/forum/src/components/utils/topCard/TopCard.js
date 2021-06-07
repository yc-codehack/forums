import React, { useState, useEffect } from "react";
import ListField from "../listField/ListField";

import "./TopCard.css";

import { useSelector, useDispatch } from "react-redux";
import { getTopUser, getTopCategory } from "../../../actions/extra.js";

// material ui
import { CircularProgress } from "@material-ui/core";

function TopUserCard({ type }) {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);

	const dispatch = useDispatch();

	useEffect(() => {
		{
			type === "User"
				? dispatch(getTopUser())
				: dispatch(getTopCategory());
		}
	}, [dispatch]);

	const topUserInfo = useSelector((state) => state.topUser);

	const topCategoryInfo = useSelector((state) => state.topCategory);

	return (
		<>
			{!topUserInfo.length && !topCategoryInfo.length ? null : (
				<div className="topUserCard">
					{/* Heading */}
					<div className="topUserCard__heading">Top {type}</div>
					{/* Top 5 */}
					<div className="topUserCard__top5">
						{type === "User"
							? topUserInfo.map(
									(item) =>
										item.name !== "You" && (
											<ListField
												key={item._id}
												item={item}
											/>
										)
							  )
							: topCategoryInfo.map((item) => (
									<ListField key={item._id} item={item} />
							  ))}
					</div>
					{/* Your Rating */}
					{user && type === "User" && (
						<>
							<div className="line"></div>
							<div className="topUserCard__your">
								<ListField
									key={topUserInfo.slice(-1)[0]._id}
									item={topUserInfo.slice(-1)[0]}
								/>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}

export default TopUserCard;
