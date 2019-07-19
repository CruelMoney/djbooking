import React, { PureComponent } from "react";
import { Switch, Route } from "react-router";

import content from "./content.json";
import requestformContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import "./index.css";
import { Query } from "react-apollo";
import { ME } from "../../components/gql";
import Header from "./components/Header.js";

const Index = ({ translate }) => {
	return (
		<div>
			<Header></Header>
		</div>
	);
};

export default addTranslate(Index, [content, requestformContent, modalContent]);
