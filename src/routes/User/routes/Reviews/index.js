import React, { Component } from "react";
import Reviews from "./components/Reviews";
import { Helmet } from 'react-helmet-async';

import { localize } from "react-localize-redux";

class Index extends Component {
	render() {
		const { translate } = this.props;
		const djName = this.props.profile.firstName || "Cueup";
		const title = djName + " | " + translate("reviews");

		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>
				<Reviews {...this.props} />
			</div>
		);
	}
}
export default localize(Index, "locale");
