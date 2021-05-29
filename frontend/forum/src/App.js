import "./App.css";
import CategoryCard from "./components/category/card/Card";
import Navbar from "./components/navbar/Navbar.js"
import Card from "./components/card/Card"
import Menucard from "./components/menucard/Menucard"

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="main-body">
				<div className="leftcard-compo ">
				<Menucard />
				</div>
				<div className="card-compo ">
				<Card />
				</div>
				<div className="rightcard-compo " ></div>
				</div>
			{/*<CategoryCard />*/}
		</div>
	);
}

export default App;
