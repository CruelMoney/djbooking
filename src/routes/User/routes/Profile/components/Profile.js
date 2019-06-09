import React, { Component } from "react";
import UserProfile from "./UserProfile";
import OwnProfile from "./OwnProfile";

import { connect } from "react-redux";
import * as actions from "../../../../../actions/UserActions";

class Profile extends Component {
	render() {
		if (this.props.isOwnProfile) {
			return <OwnProfile {...this.props} />;
		} else {
			return <UserProfile {...this.props} />;
		}
	}
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		deleteProfile: callback => {
			dispatch(actions.deleteProfile(callback));
		}
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...ownProps,
		...dispatchProps
	};
}

const SmartProfile = connect(
	state => state,
	mapDispatchToProps,
	mergeProps,
	{ pure: false }
)(Profile);

export default props => <SmartProfile {...props} />;
