import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import UserNavigation from "./UserNavigation";
import UserCard from "./UserCard";
import Notification from "../../../../components/common/Notification";
import UserPic from "../../../../assets/default-profile-pic.png";
import { localize } from "react-localize-redux";

class userHeader extends Component {
	static propTypes = {
		profile: PropTypes.object,
		geoAddress: PropTypes.string,
		hideInfo: PropTypes.bool,
		notification: PropTypes.string
	};

	state = {
		loadString: "..."
	};

	setValues = () => {
		const { height } = window.getComputedStyle(this.userHeader);
		this.headerHeight = Number.parseInt(height);
		this.fixedPoint = Number.parseInt(height);
		this.disabled = window.innerWidth <= 480;
		if (!this.disabled) {
			this.userHeader.style.top = -this.headerHeight + 46 + "px";
		}
	};

	componentDidMount() {
		this.setValues();
		window.addEventListener("resize", this.setValues);
		this.loadingStringPlaceholder();
	}

	componentWillReceiveProps() {
		this.setValues();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.setValues);
		clearInterval(this.intervalID);
	}

	loadingStringPlaceholder = () => {
		var self = this;

		this.intervalID = window.setInterval(function() {
			if (self.props.loading) {
				var load = self.state.loadString;
				if (load.length === 4) {
					self.setState({ loadString: "." });
				} else {
					self.setState({
						loadString: (load += ".")
					});
				}
			} else {
				clearInterval(self.intervalID);
			}
		}, 300);
	};

	render() {
		const { translate } = this.props;

		return (
			<Fragment>
				{this.props.hideCard ? null : (
					<div className="sticky-card-container">
						<div className="container ">
							<div className="row">
								<div className="col-sm-4">
									<div className="user-card-wrapper">
										<UserCard
											isOwnProfile={this.props.isOwnProfile}
											profile={this.props.profile}
											className="user-card"
											onlyPicture={this.props.hideInfo}
											picture={
												this.props.loading
													? UserPic
													: this.props.profile.picture
											}
											about={
												this.props.loading
													? this.state.loadString
													: this.props.profile.bio
											}
											rating={
												this.props.loading ? 0 : this.props.profile.avgRating
											}
											experience={
												this.props.loading ? 0 : this.props.profile.gigsCount
											}
											earned={
												this.props.loading ? 0 : this.props.profile.earned
											}
											birthday={
												this.props.loading ? null : this.props.profile.birthDay
											}
											genres={
												this.props.loading ? ["..."] : this.props.profile.genres
											}
											loading={this.props.loading}
											currency={
												!this.props.hideInfo && this.props.isOwnProfile
													? this.props.profile.settings.currency
													: "DKK"
											} //Can be set to dkk because not used if not own profile
											bankCurrency={
												this.props.isOwnProfile
													? this.props.profile.app_metadata.bankCurrency
													: "DKK"
											} //Can be set to dkk because not used if not own profile
										/>
										{this.props.actions}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<header ref={ref => (this.userHeader = ref)} className="user-header">
					<div id="stripes" className="v2">
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>

					<Notification message={this.props.notification} />

					<div className="container">
						<div className="row">
							<div className="col-sm-4" />

							<div className="user-header-content col-sm-8">
								<div className="header-info">
									<div className="user-name">
										<h1>
											{this.props.loading
												? this.state.loadString
												: (this.props.isOwnProfile
														? translate("Welcome") + " "
														: " ") + this.props.profile.firstName}
										</h1>
									</div>
									<div className="user-location">
										<h2>
											{this.props.loading ? null : (
												<svg
													version="1.1"
													id="Capa_1"
													x="0px"
													y="0px"
													width="22px"
													height="22px"
													viewBox="0 0 466.583 466.582"
													style={{
														enableBackground: "new 0 0 466.583 466.582"
													}}
												>
													<g>
														<path
															d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z"
															fill="#FFFFFF"
														/>
													</g>
												</svg>
											)}
											{this.props.loading
												? this.state.loadString
												: this.props.isOwnProfile
													? " " + this.props.geoLocation
													: this.props.profile.city}
										</h2>
									</div>
								</div>

								{this.props.loading || this.props.hideCard ? null : (
									<Fragment>
										<div className="header-divider" />
										<UserNavigation
											isOwnProfile={this.props.isOwnProfile}
											isDJ={this.props.profile.isDJ}
											isCustomer={this.props.profile.isCustomer}
										/>
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</header>
			</Fragment>
		);
	}
}

export default localize(userHeader, "locale");
