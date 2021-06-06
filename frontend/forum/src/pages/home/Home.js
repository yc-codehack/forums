import React from "react";

// components
import Navbar from "../../components/navbar/Navbar.js";
import QuesList from "../../components/ques/QuesList.js";

function Home() {
	return (
		<div className="home">
			<Navbar />
			<QuesList />
		</div>
	);
}

export default Home;
