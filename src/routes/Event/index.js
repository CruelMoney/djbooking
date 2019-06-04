import React, { Component } from "react";
import Event from "./components/Event";
import EventInfo from "./routes/EventInformation";
import Offers from "./routes/Offers";
import Review from "./routes/Review";
import User from "./routes/User";
import { Helmet } from "react-helmet-async";
import { Switch, Route } from "react-router-dom";
import content from "./content.json";
import requestFormContent from "../../components/common/RequestForm/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import "./index.css";

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
				<Event {...this.props}>
					{({ theEvent, loading, hashKey }) => (
						<Switch>
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
								component={props => (
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
								component={props => (
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
								component={props => (
									<User
										{...props}
										theEvent={theEvent}
										loading={loading}
										hashKey={hashKey}
									/>
								)}
							/>
						</Switch>
					)}
				</Event>
			</div>
		);
	}
}

export default addTranslate(Index, [content, requestFormContent]);
