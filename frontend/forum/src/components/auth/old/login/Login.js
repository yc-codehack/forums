import React, { useState } from "react";
import "./Login.css";

import { useSpring, animated } from "react-spring";

function Login() {
	const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
	const loginProps = useSpring({
		left: registrationFormStatus ? -500 : 0,
	});
	const registerProps = useSpring({
		left: registrationFormStatus ? 0 : 500,
	});
	const loginBtnProps = useSpring({
		borderBottom: registrationFormStatus
			? "solid 0px tansparent"
			: "solid 2px #1059ff",
	});
	const registerBtnProps = useSpring({
		borderBottom: registrationFormStatus
			? "solid 2px #1059ff"
			: "solid 0px transparent",
	});
	function registerClicked() {
		setRegistrationFormStatus(true);
	}
	function loginClicked() {
		setRegistrationFormStatus(false);
	}
	return (
		<div className="login-register-wrapper">
			<div className="form-group">
				<animated.form action="" id="loginform" style={loginProps}>
					<LoginForm />
				</animated.form>
			</div>
		</div>
	);
}
function LoginForm() {
	return (
		<>
			<input type="email" id="username" placeholder="Email address" />
			<input
				type="password"
				id="password"
				placeholder="Password"
				minlength="8"
				required
			/>
			<input type="submit" value="Login" className="submit" />
			<animated.div className="forgot-panel">
				<a href="#" style={{ color: "grey", paddingLeft: "10px" }}>
					forgot your password?
				</a>
			</animated.div>
		</>
	);
}

export default Login;
