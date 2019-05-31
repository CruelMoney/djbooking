import c from "../constants/constants";
import { authService as auth } from "../utils/AuthService";
import converter from "../utils/AdapterDTO";
import CueupService from "../utils/CueupService";
const cueup = new CueupService();

var ActionTypes = c.ActionTypes;

export function makeOffer({ gigId, amount, currency }, callback) {
	return function(dispatch) {
		const token = auth.getToken();
		cueup.makeOffer(token, gigId, { amount, currency }, function(err, result) {
			if (err) {
				callback(err);
			} else {
				//timeout to show success button
				setTimeout(
					() =>
						dispatch({
							type: ActionTypes.GIG_OFFER_UPDATED,
							offer: { gigId, amount, currency, ...result }
						}),
					1500
				);
				callback(null);
			}
		});
	};
}

export function getFee({ gigId, amount, currency }, callback) {
	const token = auth.getToken();
	cueup.getFees(token, gigId, { amount, currency }, function(err, result) {
		if (err) {
			callback(err);
		} else {
			callback(null, result);
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
