import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";

import content from "./content.json";
import requestformContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import { Query } from "react-apollo";
import Header from "./components/Header.js";
import { USER, UPDATE_USER } from "./gql.js";
import Sidebar from "./components/Sidebar.js";
import Footer from "../../components/common/Footer.js";
import { Overview, Settings } from "./routes";
import { Container, Row, Col } from "./components/Blocks.js";
import { useMutation } from "react-apollo-hooks";
import Notification from "../../components/common/Notification.js";
import ErrorMessageApollo from "../../components/common/ErrorMessageApollo.js";

const Content = React.memo(({ match, ...userProps }) => {
	return (
		<Container>
			<Row>
				<Sidebar {...userProps} />

				<Col
					style={{
						marginTop: "42px",
						width: "100%",
						marginBottom: "60px",
						zIndex: 0,
						position: "relative"
					}}
				>
					<Switch>
						<Redirect
							from={match.path + "/profile"}
							to={match.path + "/overview"}
						/>
						<Route
							path={match.path + "/overview"}
							render={props => <Overview {...props} {...userProps} />}
						/>
						<Route
							path={match.path + "/settings"}
							render={props => <Settings {...props} {...userProps} />}
						/>
					</Switch>
				</Col>
			</Row>
		</Container>
	);
});

const Index = ({ translate, match }) => {
	const [updateUser, { loading: isSaving, error }] = useMutation(UPDATE_USER);

	return (
		<Query query={USER} variables={{ permalink: match.params.permalink }}>
			{({ data: { user }, loading }) => (
				<div>
					<SavingIndicator loading={isSaving} error={error} />
					<div>
						<Header user={user} loading={loading} />
						<Content
							match={match}
							user={user}
							loading={loading}
							updateUser={updateUser}
							translate={translate}
						/>
					</div>
					<Footer
						noSkew
						firstTo={translate("routes./how-it-works")}
						secondTo={translate("routes./")}
						firstLabel={translate("how-it-works")}
						secondLabel={translate("arrange-event")}
						title={translate("Wonder how it works?")}
						subTitle={translate("See how it works, or arrange an event.")}
					/>
				</div>
			)}
		</Query>
	);
};

const SavingIndicator = ({ loading, error }) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (loading === false) {
			const r = setTimeout(_ => setActive(false), error ? 10000 : 1000);
			return _ => clearTimeout(r);
		} else {
			setActive(true);
		}
	}, [error, loading]);

	return (
		<Notification
			overlay
			bottom
			active={active}
			loading={loading}
			message={"Saving"}
		>
			{error && <ErrorMessageApollo error={error} />}
		</Notification>
	);
};

export default addTranslate(Index, [content, requestformContent, modalContent]);
