import React, { useState } from "react";

import "./Auth.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// image
import logo from "../../assets/logo/forum_logo.png";

// materialUi
import { Button, Typography } from "@material-ui/core";

import DivideOrLine from "../../components/utils/divideOrLine/DivideOrLine.js";
import ThirdPartyAuth from "../../components/auth/utils/thirdPartyAuth/ThirdPartyAuth.js";
import { Input } from "../../components/utils/input/Input.js";
import Loading from "../../components/utils/loading/Loading.js";
import AuthImage from "../../assets/auth.png";

import { signin, signup } from "../../actions/auth.js";
import axios from "axios";

const initialFormDataState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	// states
	const [isSignIn, setSignIn] = useState(true);

	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState(initialFormDataState);

	const [isLoading, setIsLoading] = useState(false);

	const [isSignupComplete, setIsSignupComplete] = useState(false);

	const dispatch = useDispatch();
	// to redirect page to main after auth
	const history = useHistory();

	// function
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (isSignIn) {
			dispatch(signin(formData, history));
		} else {
			// const res = await signup(formData);
			// console.log(res);
			// if (res.status === 200) {
			// 	setIsSignupComplete(true);
			// }
			// // dispatch(signup(formData, history));

			try {
				axios
					.post("http://localhost:5000/auth/signup", formData)
					.then((res) => {
						setIsSignupComplete(true);
						setIsLoading(false);
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {}
		}

		console.log("component/Auth.js", formData);
	};

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleSwitch = () => {
		setFormData(initialFormDataState);
		setSignIn((prevIsSignIn) => !prevIsSignIn);
		setShowPassword(false);
	};

	return (
		<div className="auth">
			{/* Banner */}
			<div className="auth__banner">
				<img
					src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
					alt=""
				/>
			</div>
			{/* Login/Signup */}
			<div className="auth__main">
				{isLoading && (
					<Loading
						text={
							isSignIn
								? "Please hold on signing you in..."
								: "Creating your account"
						}
					/>
				)}

				<div className="auth__mainHeader">
					<div className="auth__mainHeaderLogo">
						<img
							className="auth__mainHeaderLogoImg"
							src={logo}
							alt="forum"
						/>
						<div className="auth__mainHeaderLogoText">
							for
							<span className="auth__mainHeaderLogoTextColor">
								um
							</span>
						</div>
					</div>
				</div>

				{!isSignupComplete ? (
					<>
						<form
							onSubmit={handleSubmit}
							className="auth__mainCredentials"
						>
							{/* show only is signUp */}
							{!isSignIn && (
								<>
									<Input
										name="firstName"
										label="First Name"
										handleChange={handleChange}
										autoFocus
										type="text"
									/>
									<Input
										name="lastName"
										label="Last Name"
										handleChange={handleChange}
										type="text"
									/>
								</>
							)}

							{/* always show */}
							<Input
								name="email"
								label="Email"
								handleChange={handleChange}
								type="email"
							/>
							<Input
								name="password"
								label="Password"
								min={8}
								handleChange={handleChange}
								type={showPassword ? "text" : "password"}
								handleShowPassword={handleShowPassword}
							/>

							{/* forgot password link */}
							{isSignIn && (
								<Link
									className="auth__mainCredentialsLink"
									to="/"
								>
									<p>forgot password ?</p>
								</Link>
							)}

							{/* show only is signUp */}
							{!isSignIn && (
								<Input
									name="confirmPassword"
									label="Repeat Password"
									handleChange={handleChange}
									type="password"
								/>
							)}

							{/* Btn */}
							<Button
								type="submit"
								variant="contained"
								className="auth__mainCredentialsBtn"
							>
								{isSignIn ? "Sign In" : "SIgn Up"}
							</Button>
						</form>

						<div className="auth__mainFooter">
							{/* DivideLine */}
							<DivideOrLine color="#e9e9e9" />

							{/* SingIn/SignUp */}
							{isSignIn ? (
								<Button
									variant="contained"
									className="auth__mainFooterBtn"
									onClick={handleSwitch}
								>
									Sign Up
								</Button>
							) : (
								<Button
									type="submit"
									variant="contained"
									className="auth__mainFooterBtn"
									onClick={handleSwitch}
								>
									Sign In
								</Button>
							)}

							{/* 3rd part Options */}
							<ThirdPartyAuth />
						</div>
					</>
				) : (
					<Typography className="auth__mainVerify" variant="h4">
						We have sent an verification mail. Please check your
						mail to verify your identity
					</Typography>
				)}
			</div>

			{/* Components */}

			{/* Btn */}
		</div>
	);
};

export default Auth;
