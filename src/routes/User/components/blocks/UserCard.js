import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "../../../../components/common/Rating";
import Navlink from "../../../../components/common/Navlink";
import Logo from "../../../../components/common/Logo";
import InfoPopup from "../../../../components/common/InfoPopup";

import Button from "../../../../components/common/Button-v2";
import * as actions from "../../../../actions/UserActions";
import { connect } from "react-redux";
import { ImageCompressor } from "../../../../utils/ImageCompressor";
import { localize } from "react-localize-redux";
import CurrencyValue from "../../../../components/common/CurrencyValue";

class UserCard extends Component {
	static propTypes = {
		profile: PropTypes.object,
		picture: PropTypes.string,
		about: PropTypes.string,
		rating: PropTypes.number,
		experience: PropTypes.number,
		earned: PropTypes.number,
		birthday: PropTypes.string,
		genres: PropTypes.arrayOf(PropTypes.string),
		onlyPicture: PropTypes.bool,
		changePicture: PropTypes.func
	};

	state = { loading: false, err: null };

	handleFile = e => {
		const { translate } = this.props;

		var self = this;
		self.setState({ loading: true });
		const file = e.target.files[0];

		ImageCompressor(file, (err, result) => {
			if (err) {
				self.setState({
					err: err,
					loading: false
				});
			} else {
				self.props.updatePicture(result, (err, res) => {
					if (err) {
						self.setState({ err: translate("unknown-error") });
					} else {
						self.setState({ err: "", loading: false });
					}
				});
			}
		});
	};

	render() {
		const { translate } = this.props;

		var genres = [];
		const genresCount = this.props.genres.length;

		this.props.genres.forEach(function(genre, i) {
			if (i + 1 === genresCount) {
				genres.push(genre);
			} else {
				genres.push(genre + ", ");
			}
		});

		return (
			<div className={"card " + this.props.className}>
				<div
					style={{
						width: "280px",
						height: "280px",
						position: "relative"
					}}
					className={
						this.state.loading || this.state.err
							? "user-card-picture-wrapper loading"
							: "user-card-picture-wrapper"
					}
					htmlFor="fileupload"
				>
					<div className="user-card-picture-overlay">
						<div
							style={{
								position: "absolute",
								left: "-8px",
								top: "237px",
								height: "20px"
							}}
							className="logo"
						>
							<Navlink to="/">
								<Logo />
							</Navlink>{" "}
						</div>
					</div>
					<div id="profile-picture-upload">
						<canvas ref="canvas" style={{ display: "none" }} />
						{this.props.isOwnProfile ? (
							<input
								name="fileupload"
								id="fileupload"
								type="file"
								accept="image/*"
								onChange={this.handleFile}
							/>
						) : null}
						{this.state.loading ? (
							<Button isLoading />
						) : this.state.err ? (
							<label htmlFor="fileupload">
								<span>{this.state.err}</span>
							</label>
						) : this.props.isOwnProfile ? (
							<label htmlFor="fileupload">
								<span>{translate("Change image")}</span>
							</label>
						) : null}
					</div>

					<div
						className={
							"user-card-picture " + (this.props.isOwnProfile ? "editable" : "")
						}
						style={{ backgroundImage: "url(" + this.props.picture + ")" }}
					/>
					{this.props.isOwnProfile ? (
						<div
							className="user-card-picture-blurred"
							style={{ backgroundImage: "url(" + this.props.picture + ")" }}
						/>
					) : null}
				</div>

				<div
					className={
						this.props.onlyPicture ? "user-card-text hide" : "user-card-text"
					}
				>
					<div className="user-card-info">
						{this.props.profile.isDJ ? (
							<div>
								<div className="user-card-fact">
									<p>
										{translate("experience")}
										<InfoPopup
											info={
												this.props.isOwnProfile
													? translate("experience-description")
													: translate("experience-description-public")
											}
										/>
									</p>

									{this.props.experience + " gigs"}
								</div>
								{this.props.isOwnProfile ? (
									<div className="user-card-fact">
										<p>
											{translate("earned")}
											<InfoPopup info={translate("earned-description")} />
										</p>
										<CurrencyValue
											amount={this.props.earned}
											from={this.props.bankCurrency}
											to={this.props.currency}
										/>
									</div>
								) : null}
								<div className="user-card-fact">
									<p>{translate("rating")}</p>
									{this.props.rating > 0 ? (
										<Rating rating={this.props.rating} />
									) : (
										translate("no-reviews-yet")
									)}
								</div>
							</div>
						) : null}

						{this.props.profile.isCustomer ? (
							<div>
								<div className="user-card-fact">
									<p>{translate("upcoming")}</p>
									{this.props.profile.upcomingEvents + " events"}
								</div>
								<div className="user-card-fact">
									<p>{translate("finished")}</p>
									{this.props.profile.finishedEvents + " events"}
								</div>
							</div>
						) : null}

						{this.props.profile.discountPoints > 0 &&
						this.props.isOwnProfile ? (
							<div className="user-card-fact">
								<p>
									Cueup points
									<InfoPopup info={translate("cueup-points-description")} />
								</p>
								{this.props.profile.discountPoints + " Points"}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		updatePicture: (img, callback) => {
			dispatch(actions.SaveProfilePicture(img, ownprops.profile, callback));
		}
	};
}

const SmartUserCard = connect(state => state, mapDispatchToProps)(UserCard);

export default localize(SmartUserCard, "locale");
