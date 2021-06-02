import React, { useState } from "react";
import "./card.css";
import Ques from "../ques/Ques";

import { useSelector } from "react-redux";

const Card = () => {
	const questions = useSelector((state) => state.questions);

	console.log(questions);

	const [ques, setQues] = useState([
		{
			id: 1,
			question: "What is your name ?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec porta felis. Suspendisse potenti. Sed vel ex dictum, sodales leo at, dictum enim. Quisque ultrices metus nec pharetra placerat. Aliquam vitae lobortis lacus. Aenean commodo, nulla at faucibus iaculis, nulla mauris molestie ante, ut semper justo ante vel mauris. Donec euismod feugiat aliquet.Sed sollicitudin mauris quis tincidunt convallis. Phasellus suscipit, neque at convallis suscipit, risus enim euismod mi, vitae consequat orci arcu id quam. Phasellus interdum purus eu enim pretium auctor. Nulla hendrerit diam orci, et maximus leo ultrices sit amet. Maecenas dolor mi, gravida quis libero sit amet, ultricies gravida justo. Quisque bibendum a quam eget bibendum. Cras rhoncus feugiat dolor, quis",
			time: "3 Days ago",
			vote: 42,
			username: "Ritik Nair",
			avatar_url:
				"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Fmale-boy-person-people-avatar%2F159358&psig=AOvVaw0lSiLNu4of-6Oo-139zSXJ&ust=1622217690109000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiQjI-e6vACFQAAAAAdAAAAABAD",
		},
		{
			id: 2,
			question: "What is your name ?",
			answer: "My name is Ritik Nair",
			time: "3 Days ago",
			vote: 42,
			username: "Ritik Nair",
			avatar_url:
				"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Fmale-boy-person-people-avatar%2F159358&psig=AOvVaw0lSiLNu4of-6Oo-139zSXJ&ust=1622217690109000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiQjI-e6vACFQAAAAAdAAAAABAD",
		},
		{
			id: 3,
			question: "What is your name ?",
			answer: "My name is Ritik Nair",
			time: "3 Days ago",
			vote: 42,
			username: "Ritik Nair",
			avatar_url:
				"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Fmale-boy-person-people-avatar%2F159358&psig=AOvVaw0lSiLNu4of-6Oo-139zSXJ&ust=1622217690109000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiQjI-e6vACFQAAAAAdAAAAABAD",
		},
		{
			id: 4,
			question: "What is your name ?",
			answer: "My name is Ritik Nair",
			time: "3 Days ago",
			vote: 42,
			username: "Ritik Nair",
			avatar_url:
				"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Fmale-boy-person-people-avatar%2F159358&psig=AOvVaw0lSiLNu4of-6Oo-139zSXJ&ust=1622217690109000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiQjI-e6vACFQAAAAAdAAAAABAD",
		},
	]);

	// let queslist = ques.map((item) => {
	// 	return (
	// 		<div>
	// 			<Ques item={item} />
	// 		</div>
	// 	);
	// });
	// <Ques item={ques[0]}/>

	// return <div className="queslist mt-5">{queslist}</div>;
	return <Ques item={ques[0]} />;
};

export default Card;
