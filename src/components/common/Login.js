import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import SubmitButton from "./SubmitButton";
import Textfield from "./Textfield";
import Form from "./Form-v2";
import CueupService from "../../utils/CueupService";
import { connect } from "react-redux";
import * as actions from "../../actions/LoginActions";
import { withRouter } from "react-router-dom";
import LoadHandler from "./LoadingScreen";
import Loadable from "react-loadable";
import { getTranslate } from "react-localize-redux";
import { Mutation } from "react-apollo";
import { LOGIN } from "../gql";
import Button from "./Button-v2";
import ErrorMessage from "./ErrorMessage";
import ErrorMessageApollo from "./ErrorMessageApollo";

const AsyncUser = Loadable({
	loader: () => import("../../routes/User"),
	loading: LoadHandler
});

let cueup = new CueupService();

class Login extends Component {
	displayName = "Login";
	color = "#31DAFF";

	static proptypes = {
		login: PropTypes.func.isRequired,
		isLoading: PropTypes.bool,
		error: PropTypes.string
	};

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

	onRequestChangePassword = (form, callback) => {
		const { translate } = this.props;

		var email = this.state.email;
		let self = this;
		if (!email) {
			return callback(translate("please-enter-email"));
		}
		cueup.requestPasswordChange(email, function(err, resp) {
			if (err) {
				callback(err.message || translate("unknown-error"));
			} else {
				self.setState({ message: translate("reset-password-msg") });
				callback(null);
			}
		});
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

	render() {
		const { isLoading } = this.state;
		const { translate, onLogin } = this.props;

		return (
			<div className="login">
				<Mutation
					mutation={LOGIN}
					variables={this.state}
					onCompleted={({ signIn: { token } }) => {
						onLogin(token, _ => {
							this.setState({ isLoading: false });
						});
					}}
				>
					{(mutate, { error }) => {
						return (
							<Fragment>
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
										active
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
								<ErrorMessageApollo error={error} />
							</Fragment>
						);
					}}
				</Mutation>
				<Form name="forgot_password">
					<Button name="forgot_password" onClick={this.onRequestChangePassword}>
						{translate("forgot") + "?"}
					</Button>
					{this.state.message ? <p>{this.state.message}</p> : null}
				</Form>
			</div>
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

function mapDispatchToProps(dispatch, ownprops) {
	return {
		onLogin: (token, callback) => dispatch(actions.onLogin(token, callback))
	};
}

const SmartLogin = withRouter(
	connect(
		getPropsFromState,
		mapDispatchToProps
	)(Login)
);

export default props => <SmartLogin {...props} />;
