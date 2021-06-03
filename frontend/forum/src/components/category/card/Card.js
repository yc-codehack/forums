import React from "react";

import "./Card.css";

// images
import all from "../../../assets/category/all.svg";

function CategoryCard({ item }) {
	return (
		<div className="card__category mt-5">
			<div className="card__startLine"></div>
			<div className="card__info">
				<img className="card__infoImg" src={item.image} alt="" />
				<div className="card__infoText">
					<h3 className="card__infoTextHeading">{item.name}</h3>
					<p className="card__infoTextPara">{item.description}</p>
				</div>
			</div>
			<div className="card__details">
				<div className="card__detailsAnalytics">
					<div className="card__detailsQuestions">
						<h4>Questions</h4>
						<p className="card__detailsQuestionsCount">
							{item.quesCount}
						</p>
					</div>
					<div className="card__detailsAnswers">
						<h4>Answers</h4>
						<p className="card__detailsAnswersCount">
							{item.ansCount}
						</p>
					</div>
				</div>

				<div className="card__detailsLatestQuestion">
					<h4 className="card__detailsLatestQuestionHeading">
						Latest Question
					</h4>

					<div className="card__detailsLatestQuestionUser">
						<img
							className="card__detailsLatestQuestionUserImg"
							src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._hGeapLP9fx2lCAsettHeQHaLH%26pid%3DApi&f=1"
							alt=""
						/>
						<p className="card__detailsLatestQuestionUserQuestion">
							Are their any simple way
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoryCard;
