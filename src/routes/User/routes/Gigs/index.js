import React, { Component } from "react";
import Gigs from "./components/Gigs";
import { Helmet } from 'react-helmet-async';


export default class Index extends Component {
	render() {
		return (
			<div>
				<Gigs {...this.props} />
			</div>
		);
	}
}
