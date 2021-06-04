import React from "react";

// components
import Navbar from "../../components/navbar/Navbar.js";
import Card from "../../components/card/Card.js";
import Menucard from "../../components/menucard/Menucard"
// import CategoryCard from "../../components/category/Category.js";

function Home() {
	return (
		<div className="home">
			<Navbar />
			<Card />
			{/* <CategoryCard /> */}
		</div>
	);
}

export default Home;
