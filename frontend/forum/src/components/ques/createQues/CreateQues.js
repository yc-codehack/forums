/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import "./CreateQues.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Input, SelectBox, CheckBox } from "../../utils/input/Input";

import { Button, Avatar, Typography } from "@material-ui/core";

import { createQuestion } from "../../../actions/questions.js";
import { getCategory } from "../../../actions/extra.js";

const initialFormDataState = {
	title: "",
	category: "",
	subcategory: "",
	description: "",
	email: false,
};

function CreateQues({ fun }) {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getCategory());
	}, [dispatch]);
	const categoryList = useSelector((state) => state.list);

	// console.log(categoryList);

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState(initialFormDataState);

	const handleCheckboxChange = (e) => {
		setFormData({ ...formData, [e.target.name]: !formData.email });
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(createQuestion(formData));
		fun(false);
	};

	return (
		<div className="createQues">
			<div className="createQues__heading">
				{user ? (
					<>
						<Avatar
							alt={user.result.name}
							src={user.result.imageUrl}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography variant="h5">
							{user.result.name.split(" ")[0]}
						</Typography>
					</>
				) : (
					<h2>Posting as anonymous</h2>
				)}
			</div>

			<form onSubmit={handleSubmit}>
				<Input
					className="createQues__title"
					name="title"
					label="Title"
					autoFocus
					type="text"
					required
					handleChange={handleChange}
					size="small"
				/>
				<div className="createQues__2section">
					<div className="createQues__2sectionSelectWrapper">
						<SelectBox
							required
							fullWidth
							autoWidth
							name="category"
							label="Category"
							variant="outlined"
							menuArray={categoryList}
							handleChange={handleChange}
							value={formData.category}
							size="small"
						/>
					</div>
					<div className="createQues__2sectionTextWrapper">
						<Input
							name="subcategory"
							label="Sub Category"
							type="text"
							required
							handleChange={handleChange}
							size="small"
						/>
					</div>
					<Input
						name="description"
						label="Description"
						type="text"
						rows={4}
						multiline
						handleChange={handleChange}
						size="small"
					/>
				</div>
				<div className="createQues__footer">
					{user && (
						<CheckBox
							name="email"
							label="Notify with email when somebody answers"
							checked={formData.email}
							htmlColor="#469ae2"
							handleChange={handleCheckboxChange}
						/>
					)}
					<Button
						type="submit"
						variant="container"
						htmlColor="#469ae2"
					>
						Post
					</Button>
				</div>
			</form>
		</div>
	);
}

export default CreateQues;
