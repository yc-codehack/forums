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
						<div className="rightcard-compo " ></div>
						</div>
				</Switch>
			
			</Router>
		</div>
	);
}

export default App;
