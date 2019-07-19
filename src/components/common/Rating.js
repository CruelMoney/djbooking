import React, { Component } from "react";
import PropTypes from "prop-types";

class Star extends Component {
	handleMouseOver = () => {
		if (this.props.editable) {
			this.props.onHover(this.props.index);
		}
	};

	handleOnClick = () => {
		if (this.props.editable) {
			this.props.onClick(this.props.index);
		}
	};

	render() {
		const fillID =
			"gradient-" +
			this.props.fillPercentage +
			"-" +
			this.props.index +
			"-" +
			Math.random();
		var fillStyle = { fill: "url(#" + fillID + ")" };
		return (
			<div
				className={
					this.props.editable && this.props.active
						? "ratingStar active"
						: "ratingStar"
				}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
				onClick={this.handleOnClick}
			>
				<svg
					width="21px"
					height="20px"
					viewBox="0 0 21 20"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xlinkHref="http://www.w3.org/1999/xlink"
				>
					<defs>
						<linearGradient id={fillID} x1="0" x2="100%" y1="0" y2="0">
							<stop
								offset={this.props.fillPercentage}
								stopColor={this.props.color}
								stopOpacity="1"
							/>
							<stop
								offset={this.props.fillPercentage}
								stopColor={this.props.emptyColor}
								stopOpacity="1"
							/>
						</linearGradient>
						<polygon
							id={"path-" + this.props.index}
							points="452.489618 516.544156 446.006678 519.952439 447.244809 512.733579 442 507.621154 449.248148 506.567936 452.489618 500 455.731088 506.567936 462.979236 507.621154 457.734427 512.733579 458.972559 519.952439"
						/>
						<mask
							id={"mask-" + this.props.index}
							maskContentUnits="userSpaceOnUse"
							maskUnits="objectBoundingBox"
							x="0"
							y="0"
							width="20.9792363"
							height="19.9524394"
							fill={this.props.emptyColor}
						>
							<use xlinkHref={"#path-" + this.props.index} />
						</mask>
					</defs>
					<g
						stroke="none"
						strokeWidth="1"
						style={{ strokeWidth: "0px" }}
						fill="none"
						fillRule="evenodd"
					>
						<g
							transform="translate(-442.000000, -500.000000)"
							stroke={this.props.color}
							style={fillStyle}
						>
							<use
								mask={"url(#mask-" + this.props.index + ")"}
								xlinkHref={"#path-" + this.props.index}
							/>
						</g>
					</g>
				</svg>
			</div>
		);
	}
}

export default class Rating extends Component {
	state = {
		errors: []
	};

	componentWillMount() {
		this.setState({
			origRating: this.props.rating || 0,
			rating: this.props.rating || 0
		});

		if (this.props.editable) {
			this.removeValidationFromContext = this.context.registerValidation(show =>
				this.isValid(show)
			);

			if (this.context.updateValue) {
				this.context.updateValue(this.props.name, this.props.rating);
			}

			if (this.context.registerReset) {
				this.removeReset = this.context.registerReset(() =>
					this.setState({
						origRating: this.props.rating || 0,
						rating: this.props.rating || 0
					})
				);
			}
		}
	}

	componentWillUnmount() {
		if (this.removeValidationFromContext) {
			this.removeValidationFromContext();
		}
		if (this.removeReset) {
			this.removeReset();
		}
	}

	isValid = showErrors => {
		var errors = [];

		if (this.state.rating === 0) {
			errors = ["Please give a rating"];
		}

		if (showErrors) {
			this.setState({
				errors
			});
		}

		return !errors.length;
	};

	updateRating = i => {
		if (this.props.editable) {
			this.setState({
				origRating: i + 1,
				rating: i + 1
			});

			this.context.updateValue(this.props.name, i + 1);
		}
	};

	updatePotentialRating = i => {
		if (this.props.editable) {
			this.setState({
				potRating: i + 1
			});
		}
	};

	handleMouseOver = () => {
		if (this.props.editable) {
			this.setState({
				rating: this.state.potRating
			});
		}
	};

	handleMouseOut = () => {
		if (this.props.editable) {
			this.setState({
				rating: this.state.origRating
			});
		}
	};

	render() {
		const fullStarsCount = Math.floor(this.state.rating);
		const fillPercentage = ((this.state.rating % 1) * 100).toString() + "%";
		var stars = [];

		const color = this.props.color || this.context.color;
		const emptyColor = this.props.emptyColor || "#FFF";

		for (var i = 0; i < 5; i++) {
			if (i < fullStarsCount) {
				stars.push(
					<Star
						key={i}
						index={i}
						onClick={this.updateRating}
						onHover={this.updatePotentialRating}
						editable={this.props.editable}
						active={true}
						color={color}
						emptyColor={emptyColor}
						fillPercentage="100%"
					/>
				);
			} else if (i === fullStarsCount) {
				stars.push(
					<Star
						key={i}
						index={i}
						onClick={this.updateRating}
						onHover={this.updatePotentialRating}
						editable={this.props.editable}
						active={false}
						color={color}
						emptyColor={emptyColor}
						fillPercentage={fillPercentage}
					/>
				);
			} else {
				stars.push(
					<Star
						key={i}
						index={i}
						onClick={this.updateRating}
						onHover={this.updatePotentialRating}
						editable={this.props.editable}
						active={false}
						color={color}
						emptyColor={emptyColor}
						fillPercentage="0%"
					/>
				);
			}
		}

		return (
			<div
				className="rating"
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
			>
				{stars}
				{this.state.errors.length ? (
					<div
						className="form-error"
						style={{ marginTop: "0", marginLeft: "10px" }}
					>
						{this.state.errors.map((error, i) => (
							<div key={i}>{error}</div>
						))}
					</div>
				) : null}
			</div>
		);
	}
}

Rating.contextTypes = {
	registerValidation: PropTypes.func,
	updateValue: PropTypes.func,
	isFormValid: PropTypes.func,
	registerReset: PropTypes.func,
	color: PropTypes.string
};
