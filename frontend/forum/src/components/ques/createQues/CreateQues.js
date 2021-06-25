/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import "./CreateQues.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Input, SelectBox, CheckBox } from "../../utils/input/Input";

import { Button, Avatar, Typography } from "@material-ui/core";

import { createQuestion, updateQuestion } from "../../../actions/questions.js";
import { getCategory } from "../../../actions/extra.js";
import RichEditor from "../../richEditor/RichEditor.js";

function CreateQues({ fun, initialFormData }) {
	const initialFormDataState = {
		...initialFormData,
		email: false,
	};
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
		// console.log(e.target);
		e.target
			? setFormData({ ...formData, [e.target.name]: e.target.value })
			: setFormData({ ...formData, ["description"]: e });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (!formData.id) {
			dispatch(createQuestion(formData));
		} else {
			const sendData = {
				_id: formData.id,
				title: formData.title,
				description: formData.description,
				category: formData.category,
				subcategory: formData.subcategory,
			};
			console.log("formData", sendData);
			dispatch(updateQuestion(sendData));
		}

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
					value={formData.title}
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
							value={formData.subcategory}
							handleChange={handleChange}
							size="small"
						/>
					</div>
					{/* <Input
						name="description"
						label="Description"
						type="text"
						rows={4}
						multiline
						handleChange={handleChange}
						size="small"
					/> */}
					<RichEditor
						handleChange={handleChange}
						name="description"
						value={formData.description}
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
