import React, { Component } from "react";
import Events from "./components/Events";
import { Helmet } from "react-helmet-async";

export default class Index extends Component {
	render() {
		const { user = {} } = this.props;

		let { userMetadata = {} } = user;
		const djName = userMetadata.firstName;
		const title = djName + " | Events";

		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>
				<Events {...this.props} />
			</div>
		);
	}
}
