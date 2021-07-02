import jwt from "jsonwebtoken";

function authUserInfo(token) {
	const isCustomAuth = token.length < 500;

	let decodedData;

	if (token && isCustomAuth) {
		decodedData = jwt.verify(
			token,
			"test" // REVIEW move the secret text to env file
		);

		// storing the id extracted from token in userId
		return decodedData?.id;
	} else {
		decodedData = jwt.decode(token);

		// storing the id extracted from token in userId
		return decodedData?.sub;
	}
}

export default authUserInfo;
