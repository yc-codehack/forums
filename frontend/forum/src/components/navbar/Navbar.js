import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import decode from "jwt-decode";

// materialUI
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import { Avatar, Button, Typography } from "@material-ui/core";

// image
import logo from "../../assets/logo/forum_logo.png";

const Navbar = () => {
	const dispatch = useDispatch();

	// used to redirect to different url
	// in this case to home page after login/logout
	const history = useHistory();

	//
	const location = useLocation();

	// * State to keep track of if sidebar is open or close
	// * and toggle css class accordingly to show/hide sidebar
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const [isUserInfoOpen, setUserInfoOpen] = useState(false);

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile")) // * Getting data of user saved in local storage
	);

	useEffect(() => {
		const token = user?.token;

		// if (token) {
		// 	const decodedToken = decode(token);
		// 	if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		// }

		// JWT logic
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		setSidebarOpen(false);
		dispatch({ type: "LOGOUT" });
		history.push("/auth");
		setUser(null);
	};

	return (
		<div className="navbar">
			{/* LOGO */}
			<div className="navbar__logo">
				<img className="navbar__logoImg" src={logo} alt="forum" />
				<div className="navbar__logoText">
					for<span className="navbar__logoTextColor">um</span>
				</div>
			</div>

			<div
				className="navbar__toggle"
				onClick={() => setSidebarOpen(!isSidebarOpen)}
			>
				{isSidebarOpen ? (
					<CloseIcon className="navbar__close" />
				) : (
					<MenuIcon className="navbar__hamburger" />
				)}
			</div>

			<div
				className={
					isSidebarOpen
						? "navbar__sidebar navbar__sidebarActive"
						: "navbar__sidebar"
				}
			>
				{/* SEARCH */}

				<div className="navbar__search">
					<div className="navbar__searchWrapper">
						<SearchIcon />
						<input placeholder="Search for Topics"></input>
					</div>
				</div>
				{/* USER-INFO */}
				<div className="navbar__userInfo">
					{user ? (
						<>
							<div
								className="navbar__userInfoProfile"
								onClick={() => setUserInfoOpen(!isUserInfoOpen)}
							>
								<Avatar
									className="navbar__userInfoProfileAvatar"
									alt={user.result.name}
									src={user.result.imageUrl}
								>
									{user.result.name.charAt(0)}
								</Avatar>
								<Typography
									className="navbar__userInfoProfileName"
									variant="h6"
								>
									{isSidebarOpen
										? user.result.name
										: user.result.name.split(" ")[0]}
								</Typography>
							</div>
							<div
								className={
									isUserInfoOpen
										? "navbar__userInfoCard navbar__userInfoCardActive"
										: "navbar__userInfoCard"
								}
							>
								<div className="navbar__userInfoCardEmail">
									{user.result.email}
								</div>
								<div className="navbar__userInfoCardBtnWrapper">
									<div
										component={Link}
										className="navbar__userInfoCardSetting"
										onClick={() => setSidebarOpen(false)}
									>
										<p>Settings</p>
										<SettingsIcon />
									</div>

									<div
										component={Link}
										className="navbar__userInfoCardLogout"
										onClick={logout}
									>
										<p>Logout</p>
										<ExitToAppIcon />
									</div>
								</div>
							</div>
						</>
					) : (
						<Button
							className="navbar__userInfoButton"
							component={Link}
							to="/auth"
							variant="contained"
							color="#4b5ef0"
						>
							SingIn
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
export default Navbar;
