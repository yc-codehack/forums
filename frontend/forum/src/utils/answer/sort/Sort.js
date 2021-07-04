import { useSelector, useDispatch } from "react-redux";

export const Sort = () => {
	const thread = useSelector((state) => state.Thread);
	console.log("sort", thread);
};
