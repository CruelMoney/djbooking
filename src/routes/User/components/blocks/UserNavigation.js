import React, { Component } from "react";
import PropTypes from "prop-types";
import Navlink from "../../../../components/common/Navlink";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";

class UserNavigation extends Component {
	static propTypes = {
		isDJ: PropTypes.bool,
		isCustomer: PropTypes.bool
	};

	static contextTypes = {
		editMode: PropTypes.bool,
		toggleEditMode: PropTypes.func
	};

	render() {
		const { translate, isCustomer, isDJ, isOwnProfile, user = {} } = this.props;
		const { permalink } = user;

		return (
			<div>
				<nav>
					<ul
						className="userNavigation"
						style={{
							listStyleType: "none",
							padding: "0",
							marginBottom: "0px",
							display: "flex",
							flexDirection: "row",
							textTransform: "uppercase",
							justifyContent: "space-between"
						}}
					>
						<li>
							<Navlink
								userNavigation={true}
								to={translate("routes./user/:username/profile", {
									username: permalink
								})}
								label="Information"
							/>
						</li>

						{isCustomer && isOwnProfile ? (
							<li>
								<Navlink
									userNavigation={true}
									to={translate("routes./user/:username/events", {
										username: permalink
									})}
									label="Events"
								/>
							</li>
						) : null}

						{isDJ && isOwnProfile ? (
							<li>
								<Navlink
									userNavigation={true}
									to={translate("routes./user/:username/gigs", {
										username: permalink
									})}
									label="Gigs"
								/>
							</li>
						) : null}

						{/* {!isOwnProfile && isDJ ? (
							<li>
								<Navlink
									userNavigation={true}
									to={translate("routes./user/:username/book", {
										username: permalink
									})}
									label="Book DJ"
								/>
							</li>
						) : null} */}

						{/* {isDJ ? (
							<li>
								<Navlink
									userNavigation={true}
									to={translate("routes./user/:username/reviews", {
										username: permalink
									})}
									label={translate("reviews")}
								/>
							</li>
						) : null} */}

						{isOwnProfile ? (
							<li>
								<Navlink
									userNavigation={true}
									to={translate("routes./user/:username/preferences", {
										username: permalink
									})}
									label={translate("preferences")}
								/>
							</li>
						) : null}
					</ul>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = state => ({ translate: getTranslate(state.locale) });

export default connect(
	mapStateToProps,
	null,
	null,
	{
		pure: false
	}
)(UserNavigation);
