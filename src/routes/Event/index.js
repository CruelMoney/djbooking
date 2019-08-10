import React, { Component } from "react";
import Event from "./components/Event";
import EventInfo from "./routes/EventInformation";
import Offers from "./routes/Offers";
import Review from "./routes/Review";
import User from "./routes/User";
import { Helmet } from "react-helmet-async";
import { Route } from "react-router-dom";
import content from "./content.json";
import requestFormContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import "./index.scss";
import ScrollToTop from "../../components/common/ScrollToTop";

class Index extends Component {
	render() {
		const { translate } = this.props;
		const baseurl = translate("routes./event/:id/:hash");
		return (
			<div>
				<Helmet>
					<title>Event | Cueup</title>
					<meta property="og:title" content="Event | Cueup" />
					<meta name="twitter:title" content="Event | Cueup" />
				</Helmet>
				<ScrollToTop />

				<Event {...this.props}>
					{({ theEvent, loading, hashKey }) => {
						return (
							<div>
								<Route
									path={`${baseurl}/info`}
									component={props => (
										<EventInfo
											{...props}
											theEvent={theEvent}
											loading={loading}
											hashKey={hashKey}
										/>
									)}
								/>
								<Route
									path={`${baseurl}/offers`}
									render={props => (
										<Offers
											{...props}
											theEvent={theEvent}
											loading={loading}
											hashKey={hashKey}
										/>
									)}
								/>
								<Route
									path={`${baseurl}/review`}
									render={props => (
										<Review
											{...props}
											theEvent={theEvent}
											loading={loading}
											hashKey={hashKey}
										/>
									)}
								/>
								<Route
									path={`${baseurl}/user`}
									render={props => (
										<User
											{...props}
											theEvent={theEvent}
											loading={loading}
											hashKey={hashKey}
										/>
									)}
								/>
							</div>
						);
					}}
				</Event>
			</div>
		);
	}
}

export default addTranslate(Index, [content, requestFormContent, modalContent]);
