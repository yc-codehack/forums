import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import Navbar from "../../components/navbar/Navbar.js";
import QuesList from "../../components/ques/QuesList.js";
import Category from "../../components/category/list/CategoryList.js";
import TopCard from "../../components/utils/topCard/TopCard.js";
import CreateQues from "../../components/ques/createQues/CreateQues.js";

// materialUI
import { Button, Breadcrumbs } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

function Home({ filter }) {
	const { categoryName } = useParams();
	const [showCreateQues, setShowCreateQues] = useState(false);

	const initialFormData = {
		title: "",
		category: "",
		subcategory: "",
		description: "",
	};

	const handleCreateQues = () => {
		setShowCreateQues((prevShow) => !prevShow);
	};

	const questions = useSelector((state) => state.Question);

	const breadcrumb = `/category/${categoryName}`;

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
					{/* Proper naming for the show create Ques fun */}
					{showCreateQues && (
						<CreateQues
							fun={setShowCreateQues}
							initialFormData={initialFormData}
						/>
					)}
					{filter === "category" ? (
						<>
							<Breadcrumbs aria-label="breadcrumb">
								<Link className="bread" to="/">
									<HomeIcon />
									Home
								</Link>

								<Link
									className="activeBread"
									to="/categoryList"
									aria-current="page"
								>
									Category
								</Link>
							</Breadcrumbs>
							<Category />
						</>
					) : filter === "category questions" ? (
						<>
							<Breadcrumbs aria-label="breadcrumb">
								<Link className="bread" to="/">
									<HomeIcon />
									Home
								</Link>
								<Link className="bread" to="/categoryList">
									Category
								</Link>

								<Link
									className="activeBread"
									to={breadcrumb}
									aria-current="page"
								>
									{categoryName}
								</Link>
							</Breadcrumbs>
							<QuesList filter={categoryName} sort={-1} />
						</>
					) : (
						<>
							<Breadcrumbs aria-label="breadcrumb">
								<Link
									className="activeBread"
									to="/categoryList"
									aria-current="page"
								>
									<HomeIcon />
									Home
								</Link>
							</Breadcrumbs>
							<QuesList />
						</>
					)}
				</div>
				{/* right side */}
				<div className="home__rightSide">
					<div className="home__rightSideBox1">
						<Button
							className="home__rightSideBtn"
							onClick={handleCreateQues}
						>
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
