import React, { useEffect } from "react";

import "./App.css";
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import CategoryCard from "./components/category/card/Card";
// import Navbar from "./components/navbar/Navbar.js"
// import Card from "./components/card/Card"
// import Menucard from "./components/menucard/Menucard"
// import Quesmain from "./components/ques-main/Quesmain"
import { useDispatch } from "react-redux";
import { getRecent, questionLike } from "./actions/questions.js";
import { getCategory } from "./actions/extra.js";

import Home from "./pages/home/Home.js";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRecent());
		dispatch(questionLike());
		dispatch(getCategory());
	}, [dispatch]);

	return (
		<div className="App">
			{/* <Router>
			<Navbar />
				<Switch>
					
						<div className="main-body">
						<div className="leftcard-compo ">
						<Menucard />
						</div>
						<Route exact path="/">
						<div className="card-compo ">
						<Card />
						</div>
						</Route>
						<Route path="/category">
						<div className="card-compo ">
						<CategoryCard />
						</div>
						</Route>
						<Route path="/quesmain">
						<div className="card-compo ">
						<Quesmain />
						</div>
						</Route>
						<div className="rightcard-compo " ></div>
						</div>
				</Switch>
			
			</Router> */}
			<Home />
		</div>
	);
}

export default App;
