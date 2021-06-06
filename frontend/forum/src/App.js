import React, { useEffect } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecent, questionLike } from "./actions/questions.js";
import { getCategory } from "./actions/extra.js";

import Home from "./pages/home/Home.js";
import Auth from "./pages/auth/Auth.js";
function App() {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	// dispatch(getRecent());
	// 	// dispatch(questionLike());
	// 	// dispatch(getCategory());
	// dispatch()
	// }, [dispatch]);

	return (
		<div className="app">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/auth">
						<Auth />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
