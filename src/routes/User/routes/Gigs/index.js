import React, { Component } from "react";
import Gigs from "./components/Gigs";

export default class Index extends Component {
	render() {
		return (
			<div>
				<Gigs {...this.props} />
			</div>
		);
	}
}
