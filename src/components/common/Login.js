import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SubmitButton from "./SubmitButton";
import Textfield from "./Textfield";
import Form from "./Form-v2";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTranslate } from "react-localize-redux";
import { Mutation, Query } from "react-apollo";
import { LOGIN, REQUEST_PASSWORD_RESET, ME } from "../gql";
import Button from "./Button-v2";
import * as c from "../../constants/constants";
import ErrorMessageApollo, { getErrorMessage } from "./ErrorMessageApollo";
import { authService } from "../../utils/AuthService";

class Login extends PureComponent {
	displayName = "Login";
	color = "#31DAFF";

	getChildContext() {
		return {
			color: this.color
		};
	}

	static defaultProps = {
		redirect: true
	};

	state = {
		email: "",
		password: "",
		isValid: false,
		isLoading: false
	};

	componentWillMount() {
		this.setState({
			error: this.props.error,
			message: ""
		});
	}

	onRequestChangePassword = mutate => async (form, callback) => {
		const { translate } = this.props;
		const { email } = this.state;

		if (!email) {
			return callback(translate("please-enter-email"));
		}

		try {
			const redirectLink =
				c.Environment.CALLBACK_DOMAIN + translate("routes./reset-password");
			await mutate({ variables: { email, redirectLink } });
			this.setState({ message: translate("reset-password-msg") });
			callback(null);
		} catch (error) {
			return callback(getErrorMessage(error));
		}
	};

	onChangeEmail = email => {
		this.setState({
			email
		});
	};

	onChangePassword = password => {
		this.setState({
			password
		});
	};

	redirectAfterLogin = user => {
		if (user && user.user_metadata && user.user_metadata.permaLink) {
			this.props.history.push(`/user/${user.user_metadata.permaLink}/profile`);
		}
	};

	isValid = () => {
		const { email, password } = this.state;
		return !!email && !!password;
	};

	render() {
		const { isLoading } = this.state;
		const { translate, onLogin } = this.props;

		return (
			<Query query={ME}>
				{({ refetch }) => (
					<div className="login">
						<Mutation
							mutation={LOGIN}
							variables={this.state}
							onError={error => {
								console.log({ error });
								this.setState({ isLoading: false });
							}}
							onCompleted={async ({ signIn: { token } }) => {
								if (token) {
									authService.setSession(token);
									onLogin && (await onLogin());
									await refetch();
								}
								this.setState({ isLoading: false });
							}}
						>
							{(mutate, { error }) => {
								return (
									<form onSubmit={_ => mutate()}>
										<div>
											<Textfield
												name="email"
												type="email"
												validate={["required", "email"]}
												floatingLabelText="Email"
												onChange={this.onChangeEmail}
											/>
										</div>
										<div>
											<Textfield
												name="password"
												validate={["required"]}
												type="password"
												floatingLabelText="Password"
												onChange={this.onChangePassword}
											/>
										</div>
										<div>
											<Button
												glow
												active={this.isValid()}
												disabled={!this.isValid()}
												type={"submit"}
												isLoading={isLoading}
												name="email_login"
												onClick={_ => {
													this.setState({ isLoading: true });
													mutate();
												}}
											>
												{translate("login")}
											</Button>
										</div>
										<ErrorMessageApollo
											email={this.state.email}
											error={error}
										/>
									</form>
								);
							}}
						</Mutation>
						<Mutation mutation={REQUEST_PASSWORD_RESET}>
							{mutate => {
								return (
									<Form name="forgot_password">
										<SubmitButton
											name="forgot_password"
											onClick={this.onRequestChangePassword(mutate)}
										>
											{translate("forgot") + "?"}
										</SubmitButton>
										{this.state.message ? <p>{this.state.message}</p> : null}
									</Form>
								);
							}}
						</Mutation>
						<p
							style={{
								fontSize: "12px",
								lineHeight: "1.5em",
								textAlign: "left"
							}}
						>
							{translate("removed-facebook")}
						</p>
					</div>
				)}
			</Query>
		);
	}
}

Login.childContextTypes = {
	color: PropTypes.string
};

const getPropsFromState = state => {
	return {
		translate: getTranslate(state.locale)
	};
};

const SmartLogin = withRouter(connect(getPropsFromState)(Login));

export default props => <SmartLogin {...props} />;
