import gql from "graphql-tag";

const EVENT = gql`
	query($id: ID!, $hash: String!, $locale: String) {
		event(id: $id, hash: $hash) {
			id
			name
			description
			start {
				localDate
				formattedTime(locale: $locale)
				formattedDate(locale: $locale)
			}
			end {
				localDate
				formattedTime(locale: $locale)
			}
			timeZone
			genres
			guestsCount
			status
			contactName
			contactPhone
			contactEmail
			gigs {
				id
			}
			rider {
				lights
				speakers
			}
			location {
				name
				latitude
				longitude
			}
			organizer {
				id
				picture {
					path
				}
			}
		}
	}
`;

const EVENT_GIGS = gql`
	query($id: ID!, $hash: String!, $currency: Currency, $locale: String) {
		event(id: $id, hash: $hash) {
			id
			gigs {
				id
				status
				offer {
					totalPayment(currency: $currency) {
						amount
						currency
						formatted(locale: $locale)
					}
					serviceFee(currency: $currency) {
						amount
						currency
						formatted(locale: $locale)
					}
					offer(currency: $currency) {
						amount
						currency
						formatted(locale: $locale)
					}
					cancelationPolicy {
						days
						percentage
					}
				}
				dj {
					id
					picture {
						path
					}
					email
					playingLocation {
						name
					}
					userMetadata {
						firstName
						phone
						bio
					}
					appMetadata {
						averageRating
					}
				}
			}
		}
	}
`;

const REQUEST_PAYMENT_INTENT = gql`
	query($id: ID!, $currency: Currency!, $locale: String) {
		requestPaymentIntent(gigId: $id, currency: $currency) {
			__typename
			gigId
			recommendedCurrency
			offer {
				totalPayment(currency: $currency) {
					amount
					formatted(locale: $locale)
					currency
				}
				serviceFee(currency: $currency) {
					amount
					formatted(locale: $locale)
					currency
				}
				offer(currency: $currency) {
					amount
					formatted(locale: $locale)
					currency
				}
			}
			... on StripePaymentIntent {
				token {
					token
				}
			}
		}
	}
`;

const PAYMENT_CONFIRMED = gql`
	mutation($gigId: ID!) {
		paymentConfirmed(gigId: $gigId) @client
	}
`;

const DECLINE_DJ = gql`
	mutation($gigId: ID!) {
		declineDJ(gigId: $gigId) {
			id
			statusHumanized
			status
		}
	}
`;

export {
	EVENT,
	REQUEST_PAYMENT_INTENT,
	PAYMENT_CONFIRMED,
	EVENT_GIGS,
	DECLINE_DJ
};
