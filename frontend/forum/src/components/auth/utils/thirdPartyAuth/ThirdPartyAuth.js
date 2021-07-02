import React from "react";
import "./ThirdPartyAuth.css";
import { Button } from "@material-ui/core";

function ThirdPartyAuth() {
	return (
		<div className="thirdPartyAuth">
			<p className="thirdPartyAuth__text">continue with</p>
			<div className="thirdPartyAuth__btn">
				<Button
					className="thirdPartyAuth__btnGoogle"
					variant="outlined"
				>
					<i class="fab fa-google"></i>
				</Button>
				<Button
					className="thirdPartyAuth__btnFacebook"
					variant="outlined"
				>
					<i class="fab fa-facebook-f"></i>
				</Button>
				<Button
					className="thirdPartyAuth__btnGithub"
					variant="outlined"
				>
					<i class="fab fa-github"></i>
				</Button>
				<Button
					className="thirdPartyAuth__btnTwitter"
					variant="outlined"
				>
					<i class="fab fa-twitter"></i>
				</Button>
			</div>
		</div>
	);
}

export default ThirdPartyAuth;
