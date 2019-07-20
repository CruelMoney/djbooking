import React, { Component } from "react";
import About from "./components/About";
import { Helmet } from "react-helmet-async";

import { localize } from "react-localize-redux";
import ScrollToTop from "../../components/common/ScrollToTop";

class Index extends Component {
	render() {
		const { translate } = this.props;
		const title = translate("about") + " | Cueup";

		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>
				<ScrollToTop />

				<About />
			</div>
		);
	}
}

export default localize(Index, "locale");
