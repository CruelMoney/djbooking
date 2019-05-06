import c from "../constants/constants";
import { authService as auth } from "../utils/AuthService";
import CueupService from "../utils/CueupService";
import converter from "../utils/AdapterDTO";

var ActionTypes = c.ActionTypes;
const cueup = new CueupService();

const handleCueupFeedBack = (dispatch, callback, redirect) => {
	return (error, result) => {
		if (error && error.message !== "user not found") {
			dispatch(
				(function() {
					return {
						type: ActionTypes.LOGIN_FAILED,
						err: error.message
					};
				})()
			);
			return callback(error.message);
		}
		var user = converter.user.fromDTO(result);
		dispatch(
			(function() {
				return {
					type: ActionTypes.LOGIN_SUCCEEDED,
					profile: user,
					redirect: redirect,
					loggedInCueup: true
				};
			})()
		);
		callback(null, user);
	};
};

function handleLoginFeedback(dispatch, callback, redirect = false) {
	return function(err, token) {
		if (err) {
			dispatch(
				(function() {
					return {
						type: ActionTypes.LOGIN_FAILED,
						err: err.message || err
					};
				})()
			);
			callback(err.message || err);
		} else {
			auth.setSession(token);
			cueup.getOwnUser(
				token,
				handleCueupFeedBack(dispatch, callback, redirect)
			);
		}
	};
}

export function onLogin(token, cb) {
	return function(dispatch) {
		handleLoginFeedback(dispatch, cb)(null, token);
	};
}

export function checkForLogin() {
	return function(dispatch) {
		if (auth.loggedIn()) {
			dispatch(
				(function() {
					return { type: ActionTypes.LOGIN_REQUESTED };
				})()
			);
			const token = auth.getAccessToken();
			console.log({ token });
			handleLoginFeedback(dispatch, (err, res) => {})(null, token);
		} else {
			let err = {
				message: "Error validating token"
			};
			handleLoginFeedback(dispatch, (err, res) => {})(err, null);
		}
	};
}

export function userLogout() {
	auth.logout();
	return {
		type: ActionTypes.LOGOUT_SUCCEEDED
	};
}
