import React, { useEffect } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home/Home.js";
import Auth from "./pages/auth/Auth.js";
function App() {
	return (
		<div className="app">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/categoryList">
						<Home filter="category" />
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
