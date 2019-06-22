import React, { Component } from "react";
import UserProfile from "./UserProfile";
import OwnProfile from "./OwnProfile";

class Profile extends Component {
	render() {
		if (this.props.isOwnProfile) {
			return <OwnProfile {...this.props} />;
		} else {
			return <UserProfile {...this.props} />;
		}
	}
}

export default Profile;
