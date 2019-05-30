import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import connectToForm from "../higher-order/connectToForm";
import { Button } from "./Form-v2";
import { ImageCompressor } from "../../utils/ImageCompressor";

class FileInput extends PureComponent {
	static defaultProps = {
		active: true,
		validate: [],
		height: "100%",
		width: "100%"
	};

	state = {
		loading: false
	};

	handleFile = e => {
		const { onChange } = this.props;

		var self = this;
		const file = e.target.files[0];

		ImageCompressor(
			file,
			(err, image, base64) => {
				if (err) {
					self.setState({
						err: err
					});
				} else {
					this.setState({
						image: base64
					});
					onChange(image);
				}
			},
			true
		);
	};

	render() {
		var styles = {
			base: {
				position: "relative",
				background: "rgb(49, 218, 255)",
				height: "200px",
				width: "200px",
				display: "flex",
				alignItems: "center",
				textAlign: "center",
				justifyContent: "center",
				margin: 0,
				opacity: 1,
				top: 0,
				borderRadius: "50%",
				transform: "none",
				overflow: "hidden"
			}
		};

		let { validate, active } = this.props;
		validate = active;
		active = validate;
		return (
			<div className="picture-upload-component">
				<div id="profile-picture-upload" style={styles.base}>
					<canvas ref="canvas" style={{ display: "none" }} />

					<input
						name="fileupload"
						id="fileupload"
						type="file"
						accept="image/*"
						onChange={this.handleFile}
					/>

					{this.state.loading ? (
						<Button isLoading />
					) : this.state.err ? (
						<label htmlFor="fileupload">
							<span>{this.state.err}</span>
						</label>
					) : (
						<label htmlFor="fileupload">
							<span>{"Upload image"}</span>
						</label>
					)}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							pointerEvents: "none"
						}}
					>
						<div
							className={"user-card-picture editable"}
							style={{
								backgroundImage: "url(" + this.state.image + ")",
								zIndex: 3
							}}
						/>
						<div
							className="user-card-picture-blurred"
							style={{ backgroundImage: "url(" + this.state.image + ")" }}
						/>
					</div>
				</div>

				{this.props.errors.length ? (
					<div className="errors" style={{ marginTop: "5px" }}>
						{this.props.errors.map((error, i) => (
							<p className="error" key={i}>
								{error}
							</p>
						))}
					</div>
				) : null}
			</div>
		);
	}
}

FileInput.contextTypes = {
	registerValidation: PropTypes.func.isRequired,
	updateValue: PropTypes.func,
	isFormValid: PropTypes.func,
	registerReset: PropTypes.func,
	color: PropTypes.string
};

export default connectToForm(FileInput);
