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
import Sidebar from "./components/Sidebar.js";
import styled from "styled-components";
import Footer from "../../components/common/Footer.js";

const Content = styled.div`
	height: 200vh;
`;

const Index = ({ translate, match }) => {
	return (
		<Query query={USER} variables={{ permalink: match.params.permalink }}>
			{({ data: { user }, loading }) => (
				<div>
					<div>
						<Header user={user} loading={loading} />
						<Sidebar user={user} loading={loading} />
						<Content />
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
