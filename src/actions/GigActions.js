import c from "../constants/constants";
import { authService as auth } from "../utils/AuthService";
import converter from "../utils/AdapterDTO";
import CueupService from "../utils/CueupService";
const cueup = new CueupService();

var ActionTypes = c.ActionTypes;

export function makeOffer(offer, callback) {
	return function(dispatch) {
		var data = converter.offer.toDTO(offer);
		var id = offer.gigID;

		const token = auth.getToken();
		cueup.makeOffer(token, id, data, function(err, result) {
			if (err) {
				callback(err);
			} else {
				//timeout to show success button
				setTimeout(
					() => dispatch({ type: ActionTypes.GIG_OFFER_UPDATED, offer: offer }),
					1500
				);
				callback(null);
			}
		});
	};
}

export function getFee(offer, callback) {
	var data = converter.offer.toDTO(offer);
	var id = offer.gigID;

	const token = auth.getToken();
	cueup.getFees(token, id, data, function(err, result) {
		if (err) {
			callback(err);
		} else {
			const offer = converter.offer.fromDTO(result);
			callback(null, offer);
		}
	});
}

export function declineGig(id, callback) {
	return function(dispatch) {
		const token = auth.getToken();
		cueup.declineGig(token, id, function(err, result) {
			if (err) {
				callback(err);
			} else {
				//setTimeout(()=>dispatch( dispatch(  {type: ActionTypes.GIG_DECLINED, id: id} ), 1500))
				callback(null);
			}
		});
	};
}

export function cancelGig(id, callback) {
	return function(dispatch) {
		const token = auth.getToken();
		cueup.cancelGig(token, id, function(err, result) {
			if (err) {
				callback(err);
			} else {
				//setTimeout(()=>dispatch(dispatch( {type: ActionTypes.GIG_CANCELLED, id: id} ),1500))
				callback(null);
			}
		});
	};
}
