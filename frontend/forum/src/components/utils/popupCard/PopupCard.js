import React, { useState } from "react";
import "./PopupCard.css";
import notLogedIn from "../../../assets/popups/notLogedIn.png";
import { Link } from "react-router-dom";
// maertial UI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

function PopupCard({ isOpen }) {
	const [open, setOpen] = useState(isOpen);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"You are not signed in"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<img src={notLogedIn} alt="" />
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
				<Link to="/auth">
					<Button
						color="primary"
						onClick={handleClose}
						variant="contained"
						autoFocus
					>
						Sign In
					</Button>
				</Link>
			</DialogActions>
		</Dialog>
	);
}

export default PopupCard;
