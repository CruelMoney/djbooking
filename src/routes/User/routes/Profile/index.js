import React, { Component } from "react";
import Profile from "./components/Profile";
import { Helmet } from "react-helmet-async";

import { localize } from "react-localize-redux";

class Index extends Component {
	render() {
		const { translate, user = {} } = this.props;
		const { userMetadata = {} } = user;
		const djName = userMetadata.firstName || "Cueup";
		const title = djName + " | " + translate("profile");

		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
					<meta
						name="apple-itunes-app"
						content="app-id=1458267647, app-argument=userProfile"
					/>
				</Helmet>
				<Profile {...this.props} />
			</div>
		);
	}
}

export default localize(Index, "locale");
