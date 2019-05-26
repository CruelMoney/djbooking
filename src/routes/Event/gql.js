import gql from "graphql-tag";

const EVENT = gql`
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
			offer {
				totalPayment(currency: $currency) {
					amount
					formatted(locale: $locale)
				}
				serviceFee(currency: $currency) {
					amount
					formatted(locale: $locale)
				}
				offer(currency: $currency) {
					amount
					formatted(locale: $locale)
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

export { EVENT, REQUEST_PAYMENT_INTENT };
