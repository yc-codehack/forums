import React, { useEffect } from "react";
import "./Home.css";

// components
import Navbar from "../../components/navbar/Navbar.js";
import QuesList from "../../components/ques/QuesList.js";
import Category from "../../components/category/list/CategoryList.js";
import TopCard from "../../components/utils/topCard/TopCard.js";

// materialUI
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function Home({ filter }) {
	return (
		<div className="home">
			{/* header */}
			<div className="home__header">
				<Navbar />
			</div>
			{/* main */}
			<div className="home__main">
				{/* left side */}

				<div className="home__leftSide"></div>

				{/* middle side */}
				<div className="home__middleSide">
					{filter === "category" ? <Category /> : <QuesList />}
				</div>
				{/* right side */}
				<div className="home__rightSide">
					<div className="home__rightSideBox1">
						<Button className="home__rightSideBtn">
							<AddIcon />
							Ask a Question
						</Button>
					</div>
					<div className="home__rightSideBox2">
						<TopCard type="User" />
					</div>
					<div className="home__rightSideBox3">
						<TopCard type="Category" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
