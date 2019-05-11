import React, { Component } from "react";
import EmptyPage from "../../components/common/EmptyPage";
import Footer from "../../components/common/Footer";
import { localize } from "react-localize-redux";
import Helmet from "react-helmet-async";

class NotFound extends Component {
	componentDidMount() {
		document.body.classList.add("not-found");
	}

	componentWillUnmount() {
		document.body.classList.remove("not-found");
	}

	render() {
		const { translate } = this.props;
		const siteTitle = translate("confirm-email-title");
		const siteDescription = translate("confirm-email-description");

		return (
			<div className="confirm-email-screen">
				<Helmet>
					<title>{siteTitle + " | Cueup"}</title>
					<meta name="description" content={siteDescription} />

					<meta property="og:title" content={siteTitle + " | Cueup"} />
					<meta property="og:description" content={siteDescription} />

					<meta name="twitter:title" content={siteTitle + " | Cueup"} />
					<meta name="twitter:description" content={siteDescription} />
				</Helmet>
				<div className="container fix-top-mobile">
					<div className="row">
						<div className="col-md-5 col-sm-6">
							<h1>{siteTitle}</h1>
						</div>
					</div>
				</div>

				<Footer
					color={"#31DAFF"}
					noSkew={true}
					firstTo={translate("routes./")}
					secondTo={translate("routes./signup")}
					firstLabel={translate("arrange-event")}
					secondLabel={translate("become-dj")}
					title={translate("ready-to-get-started")}
					subTitle={translate("arrange-event-or-become-dj")}
				/>
			</div>
		);
	}
}

export default localize(NotFound, "locale");
