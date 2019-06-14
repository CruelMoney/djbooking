import c from "../constants/constants";
import { authService as auth } from "../utils/AuthService";
import converter from "../utils/AdapterDTO";
import CueupService from "../utils/CueupService";
import GeoCoder from "../utils/GeoCoder";
import * as tracker from "../utils/analytics/autotrack";
import ReactPixel from "react-facebook-pixel";
import moment from "moment-timezone";

var ActionTypes = c.ActionTypes;
const cueup = new CueupService();

export function fetchEvents() {
	return function(dispatch) {
		dispatch(
			(function() {
				return {
					type: ActionTypes.FETCH_EVENTS_REQUESTED
				};
			})()
		);

		const token = auth.getToken();
		cueup.getUserEvent(token, function(err, result) {
			if (err) {
				dispatch(
					(function() {
						return { type: ActionTypes.FETCH_EVENTS_FAILED, err: err.message };
					})()
				);
			} else {
				var events = result.map(e => converter.cueupEvent.fromDTO(e));
				dispatch(
					(function() {
						return { type: ActionTypes.FETCH_EVENTS_SUCCEEDED, events: events };
					})()
				);
			}
		});
	};
}

export function fetchEvent(id, hash, authID, callback = null) {
	return function(dispatch) {
		dispatch({
			type: ActionTypes.FETCH_EVENTS_REQUESTED
		});
		const token = null;

		const promise = cueup.getEvent(token, id, hash, function(err, result) {
			if (err) {
				if (callback) {
					callback(err.message);
				}
				return dispatch({
					type: ActionTypes.FETCH_EVENTS_FAILED,
					err: err.message
				});
			} else {
				var event = converter.cueupEvent.fromDTO(result);
				if (callback) {
					callback(null);
				}
				return dispatch({
					type: ActionTypes.FETCH_EVENTS_SUCCEEDED,
					events: [event]
				});
			}
		});

		return dispatch({
			type: ActionTypes.PUSH_PROMISE,
			promise: promise
		});
	};
}

export const getLocation = location => {
	return new Promise(function(resolve, reject) {
		if (location.toUpperCase() === "CURRENT LOCATION") {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					position => {
						resolve({
							position: {
								lat: position.coords.latitude,
								lng: position.coords.longitude
							}
						});
					},
					err =>
						reject(
							"Current location could not be found. Please enter the city."
						)
				);
			} else {
				reject(
					"Current location not supported in this browser. Please enter the city."
				);
			}
		} else {
			GeoCoder.codeAddress(location, function(geoResult) {
				if (geoResult.error) {
					reject("The location could not be found, try another city");
				} else {
					GeoCoder.getTimeZone(geoResult.position)
						.then(res => {
							resolve({ ...geoResult, ...res });
						})
						.catch(err => {
							console.log(err);
							reject(err);
						});
				}
			});
		}
	});
};

export function postEvent(event, mutate, callback) {
	return async dispatch => {
		try {
			const { error } = await mutate({
				variables: event
			});
			callback(error);
			if (!error) {
				tracker.trackEventPosted();
				ReactPixel.track("Lead");
			}
		} catch (error) {
			callback(error.message);
		}
	};
}

export const checkDjAvailability = (form, mutate, callback) => {
	return function(dispatch) {
		tracker.trackCheckAvailability();
		ReactPixel.track("Search");
		getLocation(form.location)
			.then(async geoResult => {
				const event = converter.cueupEvent.toDTO(form);
				const geoData = {
					location: {
						latitude: geoResult.position.lat,
						longitude: geoResult.position.lng,
						name: event.location
					},
					timeZoneId: geoResult.timeZoneId
				};
				const variables = {
					...event,
					location: geoData.location
				};

				try {
					const { data = {}, error } = await mutate({ variables });

					callback(error, data.djsAvailable, geoData);
				} catch (error) {
					callback(error);
				}
			})
			.catch(errMessage => callback(errMessage));
	};
};

export function updateEvent(event, callback) {
	return function(dispatch) {
		var data = converter.cueupEvent.toDTO(event);
		var id = event.id;

		const token = auth.getToken();
		cueup.updateEvent(token, id, data, function(err, result) {
			if (err) {
				callback(err);
			} else {
				dispatch(fetchEvent(event.id, event.hashKey, null, callback));
			}
		});
	};
}
export function notifyPayment(id, hash, callback) {
	return function(dispatch) {
		const token = auth.getToken();
		cueup.notifyPayEvent(token, id, hash, function(err, result) {
			if (err) {
				callback(err);
			} else {
				dispatch(null);
			}
		});
	};
}

export function reviewEvent(id, hash, review, callback) {
	return function(dispatch) {
		var data = converter.review.toDTO(review);
		const token = auth.getToken();
		cueup.reviewEvent(token, id, hash, data, function(err, result) {
			if (err) {
				callback(err);
			} else {
				dispatch(fetchEvent(id, hash, null, callback));
			}
		});
	};
}

export function cancelEvent(id, hash, callback) {
	return function(dispatch) {
		const token = auth.getToken();
		cueup.cancelEvent(token, id, hash, function(err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	};
}

export function declineDJ(event, gigID, callback) {
	return function(dispatch) {
		const token = auth.getToken();
		cueup.declineDJ(token, event.id, event.hashKey, gigID, function(
			err,
			result
		) {
			if (err) {
				callback(err);
			} else {
				dispatch(fetchEvent(event.id, event.hashKey, null, callback));
			}
		});
	};
}

export function eventConfirmed(id) {
	return {
		type: ActionTypes.EVENT_CONFIRMED,
		id
	};
}
