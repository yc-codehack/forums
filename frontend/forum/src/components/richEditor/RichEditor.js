import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./RichEditor.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";

const RichEditor = ({ handleChange, value, name }) => {
	return (
		<div className="richEditor">
			<ReactQuill
				placeholder="Write your answer here"
				modules={RichEditor.modules}
				formats={RichEditor.formats}
				onChange={handleChange}
				value={value || ""}
				name={name}
			/>
		</div>
	);
};

RichEditor.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image"],
		["clean"],
		["code-block"],
	],
};

RichEditor.format = [
	"header",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	"image",
	"code-block",
];

export default RichEditor;
