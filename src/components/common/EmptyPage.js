import React, { Component } from "react";
import { localize } from "react-localize-redux";
import Svg404 from "../graphics/404";

class EmptyPage extends Component {
	render() {
		const { translate } = this.props;
		return (
			<div className="empty-page-message">
				<Svg404 style={{ marginRight: "42px", maxWidth: "50%" }} />
				<div>
					<h2 style={{ maxWidth: "220px" }}>
						{this.props.title
							? this.props.title
							: translate("empty-page-message")}
					</h2>

					<div>{this.props.message}</div>
				</div>
			</div>
		);
	}
}

export default localize(EmptyPage, "locale");
