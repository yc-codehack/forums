import React from "react";

import "./Input.css";

// materialUi
import { TextField, InputAdornment, IconButton, Grid } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Input = ({
	name,
	handleChange,
	size,
	label,
	autoFocus,
	type,
	handleShowPassword,
}) => {
	return (
		<div className="input">
			<Grid item sm={12}>
				<TextField
					name={name}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					size="small"
					required
					label={label}
					autoFocus={autoFocus}
					type={type}
					InputProps={
						name === "password"
							? {
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={handleShowPassword}
											>
												{type === "password" ? (
													<VisibilityIcon />
												) : (
													<VisibilityOffIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
							  }
							: null
					}
				/>
			</Grid>
		</div>
	);
};

export default Input;
