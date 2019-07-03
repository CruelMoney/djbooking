import converter from "../utils/AdapterDTO";
import GeoCoder from "../utils/GeoCoder";
import * as tracker from "../utils/analytics/autotrack";
import ReactPixel from "react-facebook-pixel";

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
							console.log({ err });
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
			callback(error);
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
