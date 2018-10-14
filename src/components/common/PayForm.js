import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "./Textfield";
import TextWrapper from "./TextElement";
import PoweredByStripe from "../../assets/powered_by_stripe.png";
import Form from "./Form-v2";
import SubmitButton from "./SubmitButton";
import { connect } from "react-redux";
import * as actions from "../../actions/EventActions";
import { datePipeCard, cardNumberPipe } from "../../utils/TextPipes";
import Formatter from "../../utils/Formatter";
import MoneyTable, { TableItem } from "./MoneyTable";
import { currencyConverter } from "../../utils/CurrencyConverter";
import assign from "lodash.assign";
import { getTranslate } from "react-localize-redux";

class payForm extends Component {
	static proptypes = {
		amount: PropTypes.number,
		event: PropTypes.object,
		gigId: PropTypes.number,
		currency: PropTypes.string,
		confirmPayment: PropTypes.func
	};

	componentWillMount() {
		this.amount = currencyConverter.convert(
			this.props.amount,
			this.props.offerCurrency,
			this.props.currency,
			true
		);
		this.fee = currencyConverter.convert(
			this.props.fee,
			this.props.offerCurrency,
			this.props.currency,
			true
		);
		this.amountFormatted = currencyConverter.getConvertedFormatted(
			this.props.amount,
			this.props.offerCurrency,
			this.props.currency,
			true
		);
		this.feeFormatted = currencyConverter.getConvertedFormatted(
			this.props.fee,
			this.props.offerCurrency,
			this.props.currency,
			true
		);
		this.totalFormatted = currencyConverter.getConvertedFormatted(
			this.props.fee + this.props.amount,
			this.props.offerCurrency,
			this.props.currency,
			true
		);
	}

	confirmPayment = (form, callback) => {
		const { translate } = this.props;
		const data = assign(form.values, {
			amount: Formatter.money.ToSmallest(this.amount, this.props.currency),
			fee: Formatter.money.ToSmallest(this.fee, this.props.currency),
			currency: this.props.currency,
			chosenGigID: this.props.gigId
		});
		try {
			this.props.confirmPayment(
				this.props.event.id,
				this.props.event.hashKey,
				data,
				callback
			);
		} catch (error) {
			callback(translate("event.offer.payment-failed"));
		}
	};

	notify = (form, callback) => {
		const { translate } = this.props;

		try {
			this.props.notify(
				this.props.event.id,
				this.props.event.hashKey,
				callback
			);
		} catch (error) {
			callback(translate("unknown-error"));
		}
	};

	state = {
		valid: false
	};

	render() {
		const { translate } = this.props;
		const styles = {
			inline: {
				display: "inline-block"
			},
			flex: {
				display: "flex",
				alignItems: "center"
			},
			large: {
				textarea: {
					height: "80px"
				},

				paragraph: {
					fontSize: "14px"
				},

				input: {
					fontSize: "24px",
					height: "initial",
					fontWeight: "300"
				},

				hint: {
					bottom: "20px",
					fontSize: "30px",
					fontWeight: "300"
				}
			},
			medium: {
				textarea: {
					height: "40px"
				},

				paragraph: {
					fontSize: "14px"
				},

				input: {
					fontSize: "14px",
					height: "initial",
					fontWeight: "300"
				},

				hint: {
					fontSize: "14px",
					height: "initial",
					fontWeight: "300"
				}
			},
			dottedBorderStyle: {
				borderTop: "none rgba(0, 0, 0, 1)",
				borderRight: "none rgba(0, 0, 0, 1)",
				borderBottom: "2px dotted rgba(0, 0, 0, 1) ",
				borderLeft: "none rgba(0, 0, 0, 1)",
				borderImage: "initial",
				bottom: "8px",
				boxSizing: "content-box",
				margin: "0px",
				position: "absolute",
				width: "100%",
				borderColor: "rgba(0,0,0, 0.5)"
			},
			plainBorder: {
				borderTop: "none rgb(224, 224, 224)",
				borderRight: "none rgb(224, 224, 224)",
				borderBottom: "1px solid rgb(224, 224, 224)",
				borderLeft: "none rgb(224, 224, 224)",
				borderImage: "initial",
				bottom: "8px",
				boxSizing: "content-box",
				margin: "0px",
				position: "absolute",
				width: "100%",
				display: "none"
			}
		};

		return (
			<div>
				<Form
					formValidCallback={() => this.setState({ valid: true })}
					formInvalidCallback={() => this.setState({ valid: false })}
					name="pay-form"
				>
					<div className="pay-form">
						<div className="row">
							<div className="col-md-12">
								<TextWrapper
									label={translate("Pay")}
									showLock={true}
									text={
										this.props.paymentPossible
											? translate("event.offer.payment-info")
											: translate("event.offer.pay-later")
									}
								/>
							</div>
						</div>

						<div className="row mobileColumn">
							<div
								className={
									this.props.paymentPossible
										? "col-md-push-7 col-md-5"
										: "col-xs-12"
								}
							>
								<MoneyTable>
									<TableItem
										label={translate("DJ price")}
										info={translate("event.offer.price")}
									>
										{this.amountFormatted}
									</TableItem>
									<TableItem
										label={translate("Service fee")}
										info={<div>{translate("event.offer.fee")}</div>}
									>
										{this.feeFormatted}
									</TableItem>
									<TableItem label="Total">{this.totalFormatted}</TableItem>
								</MoneyTable>
							</div>

							{this.props.paymentPossible ? (
								<div className="col-md-pull-5 col-md-7">
									<div>
										<div className="row ">
											<div className="col-xs-12">
												<TextField
													big
													name="card_name"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													type="text"
													validate={["required", "lastName"]}
													onUpdatePipeFunc={cardNumberPipe}
													fullWidth={false}
													placeholder={translate("Cardholder name")}
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-xs-12">
												<TextField
													big
													name="card_number"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													type="text"
													maxLength="19"
													validate={["required", "validateCardNumber"]}
													onUpdatePipeFunc={cardNumberPipe}
													fullWidth={false}
													placeholder="1234 1234 1234 1234"
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-xs-6">
												<TextField
													big
													name="card_expiry"
													onUpdatePipeFunc={datePipeCard}
													maxLength="5"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													validate={["required", "validateCardExpiry"]}
													type="text"
													fullWidth={true}
													placeholder={translate("mm/yy")}
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
											<div className="col-xs-6">
												<TextField
													big
													name="card_cvc"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													validate={["required", "validateCardCVC"]}
													type="number"
													fullWidth={false}
													placeholder="CVC"
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
										</div>
									</div>
								</div>
							) : null}
						</div>
						<div style={{ marginTop: "20px" }} className="row">
							<div className="col-md-12">
								<p className="terms_link">{translate("event.offer.terms")}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="row">
									<div className="col-xs-6">
										<SubmitButton
											glow
											active={this.state.valid}
											rounded={true}
											name={
												this.props.paymentPossible
													? "confirm_payment"
													: "notify_payment"
											}
											onClick={
												this.props.paymentPossible
													? this.confirmPayment
													: this.notify
											}
										>
											{this.props.paymentPossible
												? translate("Confirm & pay")
												: translate("Notify")}
										</SubmitButton>
									</div>
									<div className="col-xs-6">
										<a
											style={{ float: "right" }}
											rel="noopener noreferrer"
											href="https://stripe.com/"
											target="_blank"
										>
											<img alt="powered by stripe" src={PoweredByStripe} />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

function mapStateToProps(state, ownprops) {
	return {
		event: state.events.values[0],
		translate: getTranslate(state.locale)
	};
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		confirmPayment: (id, hash, data, callback) =>
			dispatch(actions.payEvent(id, hash, data, callback)),
		notify: (id, hash, callback) =>
			dispatch(actions.notifyPayment(id, hash, callback))
	};
}

const SmartPay = connect(mapStateToProps, mapDispatchToProps)(payForm);

export default props => <SmartPay {...props} />;
