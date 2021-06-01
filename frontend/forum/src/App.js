import "./App.css";
import CategoryCard from "./components/category/card/Card";
import Navbar from "./components/navbar/Navbar.js"
import Card from "./components/card/Card"
import Menucard from "./components/menucard/Menucard"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<Router>
			<Navbar />
				<Switch>
					<Route exact path="/">
						<div className="main-body">
						<div className="leftcard-compo ">
						<Menucard />
						</div>
						<div className="card-compo ">
						<Card />
						</div>
						<div className="rightcard-compo " ></div>
						</div>
					</Route>

					<Route path="/category">
						<div className="main-body">
						<div className="leftcard-compo ">
						<Menucard />
						</div>
						<div className="card-compo ">
						<CategoryCard />
						</div>
						<div className="rightcard-compo " ></div>
						</div>
					</Route>
				</Switch>
			
			</Router>
		</div>
	);
}

export default App;
