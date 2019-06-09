import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "../../../../components/common/Rating";
import Navlink from "../../../../components/common/Navlink";
import Logo from "../../../../components/common/Logo";
import InfoPopup from "../../../../components/common/InfoPopup";

import Button from "../../../../components/common/Button-v2";
import { ImageCompressor } from "../../../../utils/ImageCompressor";
import { localize } from "react-localize-redux";
import { Mutation } from "react-apollo";
import { UPDATE_USER } from "../../gql";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";

class UserCard extends Component {
	static propTypes = {
		profile: PropTypes.object,
		picture: PropTypes.string,
		about: PropTypes.string,
		rating: PropTypes.number,
		experience: PropTypes.number,
		birthday: PropTypes.string,
		genres: PropTypes.arrayOf(PropTypes.string),
		onlyPicture: PropTypes.bool,
		changePicture: PropTypes.func
	};

	state = { loading: false, err: null };

	handleFile = mutate => async e => {
		this.setState({ loading: true });
		const file = e.target.files[0];

		const { file: compressedFile } = await ImageCompressor(file, true);
		await mutate({
			variables: {
				picture: compressedFile
			}
		});
	};

	render() {
		const {
			translate,
			className,
			isOwnProfile,
			picture,
			onlyPicture,
			isDJ,
			experience,
			rating,
			user
		} = this.props;

		return (
			<Mutation mutation={UPDATE_USER} variables={{ id: user.id }}>
				{(mutate, { loading, error }) => {
					return (
						<div className={"card " + className}>
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
									{isOwnProfile ? (
										<input
											name="fileupload"
											id="fileupload"
											type="file"
											accept="image/*"
											onChange={this.handleFile(mutate)}
										/>
									) : null}
									{loading ? (
										<Button isLoading />
									) : error ? (
										<label htmlFor="fileupload">
											<ErrorMessageApollo error={error} />
										</label>
									) : isOwnProfile ? (
										<label htmlFor="fileupload">
											<span>{translate("Change image")}</span>
										</label>
									) : null}
								</div>

								<div
									className={
										"user-card-picture " + (isOwnProfile ? "editable" : "")
									}
									style={{ backgroundImage: "url(" + picture + ")" }}
								/>
								{isOwnProfile ? (
									<div
										className="user-card-picture-blurred"
										style={{ backgroundImage: "url(" + picture + ")" }}
									/>
								) : null}
							</div>

							<div
								className={
									onlyPicture ? "user-card-text hide" : "user-card-text"
								}
							>
								<div className="user-card-info">
									{isDJ ? (
										<div>
											<div className="user-card-fact">
												<span>
													<p>{translate("experience")}</p>
													<InfoPopup
														info={
															isOwnProfile
																? translate("experience-description")
																: translate("experience-description-public")
														}
													/>
												</span>

												{experience + " gigs"}
											</div>

											<div className="user-card-fact">
												<p>{translate("rating")}</p>
												{rating > 0 ? (
													<Rating rating={rating} />
												) : (
													translate("no-reviews-yet")
												)}
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default localize(UserCard, "locale");
