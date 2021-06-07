import React from "react";

// components
import Navbar from "../../components/navbar/Navbar.js";
import QuesList from "../../components/ques/QuesList.js";

// materialUI
import { Button } from "@material-ui/core";

function Home() {
	return (
		<div className="home">
			{/* header */}
			<div className="home__header">
				<Navbar />
			</div>
			{/* main */}
			<div className=""></div>

			{/* left side */}
			<div className="home__leftSide"></div>
			{/* middle side */}
			<div className="home__middleSide">
				<QuesList />
			</div>
			{/* right side */}
			<div className="home__rightSide">
				<Button className="home__rightSideBtn">
					Create a Question
				</Button>
			</div>
		</div>
	);
}

export default Home;
