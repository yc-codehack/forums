import React from "react";

import "./Input.css";

// materialUi
import {
	TextField,
	InputAdornment,
	IconButton,
	Grid,
	Select,
	MenuItem,
	FormControl,
	FormControlLabel,
	InputLabel,
	Checkbox,
	Typography,
	CircularProgress,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export const Input = ({
	name,
	handleChange,
	label,
	autoFocus,
	type,
	handleShowPassword,
	min,
	rows,
	required,
	multiline,
	select,
	size,
}) => {
	return (
		<div className="input">
			<Grid item sm={12}>
				<TextField
					name={name}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					required={required}
					label={label}
					autoFocus={autoFocus}
					type={type}
					minLength={min}
					rows={rows}
					multiline={multiline}
					select={select}
					size={size}
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

export const SelectBox = ({
	required,
	name,
	label,
	variant,
	menuArray,
	autoWidth,
	handleChange,
	value,
	size,
}) => {
	return (
		<div className="selectBox">
			<Grid item sm={12}>
				<FormControl
					fullWidth
					size={size}
					required={required}
					variant={variant}
				>
					<InputLabel size={size}>{label}</InputLabel>
					<Select
						size={size}
						autoWidth={autoWidth}
						label={label}
						name={name}
						value={value}
						onChange={handleChange}
					>
						{menuArray.length ? (
							menuArray.map((item) => (
								<MenuItem
									key={item.id ? item.id : item}
									value={item.name ? item.name : item}
								>
									{item.name ? item.name : item}
								</MenuItem>
							))
						) : (
							<Typography variant="p">Loading...</Typography>
						)}
					</Select>
				</FormControl>
			</Grid>
		</div>
	);
};

export const CheckBox = ({
	checked,
	handleChange,
	htmlColor,
	label,
	value,
	name,
}) => {
	return (
		<div className="checkBox">
			<Grid item sm={12}>
				<FormControlLabel
					control={
						<Checkbox
							name={name}
							checked={checked}
							onChange={handleChange}
							htmlColor={htmlColor}
						/>
					}
					label={label}
				/>
			</Grid>
		</div>
	);
};
