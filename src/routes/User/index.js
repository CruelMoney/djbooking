import React, { PureComponent } from "react";
import { Switch, Route } from "react-router";

import content from "./content.json";
import requestformContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import { Query } from "react-apollo";
import { ME } from "../../components/gql";
import Header from "./components/Header.js";
import { USER } from "./gql.js";
import Sidebar, { Spacing } from "./components/Sidebar.js";
import Footer from "../../components/common/Footer.js";
import { Overview } from "./routes";
import { Container, Row, Col } from "./components/Blocks.js";

const Content = ({ match, user, loading }) => {
	return (
		<Container>
			<Row>
				<Sidebar user={user} loading={loading} />
				<Col>
					<Switch>
						<Route path={match.path + "/overview"} component={Overview} />
					</Switch>
				</Col>
			</Row>
		</Container>
	);
};

const Index = ({ translate, match }) => {
	return (
		<Query query={USER} variables={{ permalink: match.params.permalink }}>
			{({ data: { user }, loading }) => (
				<div>
					<div>
						<Header user={user} loading={loading} />

						<Content match={match} user={user} loading={loading} />
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

export default addTranslate(Index, [content, requestformContent, modalContent]);
