import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class MyNavlink extends Component {
	static proptypes = {
		rounded: PropTypes.bool,
		primary: PropTypes.bool,
		onClick: PropTypes.func,
		borderHover: PropTypes.bool,
		buttonLook: PropTypes.bool,
		userNavigation: PropTypes.bool
	};

	static defaultProps = {
		rounded: true
	};

	render() {
		const {
			buttonLook,
			onClick,
			borderHover,
			children,
			label,
			to,
			rounded,
			important,
			userNavigation,
			...rest
		} = this.props;

		return (
			<div onClick={onClick}>
				<NavLink
					{...rest}
					to={to}
					className={"navLink " + (borderHover ? "borderHover" : "")}
					activeClassName="active"
				>
					{label ? label : children}
				</NavLink>
			</div>
		);
	}
}

export default MyNavlink;
