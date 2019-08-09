import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class Dropdown extends Component {
	displayName = "Dropdown";

	state = {
		expanded: false
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			expanded: nextProps.expanded
		});
	}

	render() {
		return (
			<div>
				<div
					className={
						this.state.expanded ? "loginDropDown active" : "loginDropDown"
					}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default onClickOutside(Dropdown);
