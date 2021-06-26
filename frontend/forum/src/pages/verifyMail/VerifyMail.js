import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, CircularProgress } from "@material-ui/core";
import Loading from "../../components/utils/loading/Loading";
import "./VerifyMail.css";

import axios from "axios";

import { verify } from "../../api";
import { verifyUser } from "../../actions/auth";

const VerifyMail = () => {
	const history = useHistory();

	const { token } = useParams();
	console.log("token", token);

	const [isVerifying, setIsVerifying] = useState(true);

	useEffect(() => {
		try {
			axios
				.post("http://localhost:5000/auth/verify", { token: token })
				.then((res) => {
					console.log(res);
					localStorage.setItem(
						"profile",
						JSON.stringify({ ...res.data })
					);
					history.push("/");
				})
				.catch((err) => {
					console.log(err);
					setIsVerifying(false);
				});
		} catch (error) {
			console.log(error);
			setIsVerifying(false);
		}
	}, []);

	return (
		<div className="verifymail">
			{isVerifying ? (
				<Loading text="Please wait while we are verifying your identity" />
			) : (
				<Loading text="Something wrong happened!!!" />
			)}
		</div>
	);
};

export default VerifyMail;
