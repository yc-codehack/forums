import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(
				token,
				"test" // REVIEW move the secret text to env file
			);

			// storing the id extracted from token in userId
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			// storing the id extracted from token in userId
			req.userId = decodedData?.sub;
		}

		next(); // pass the action to next thing
	} catch (error) {
		console.log(error);
	}
};

export default auth;
