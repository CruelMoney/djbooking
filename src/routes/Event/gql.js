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
					canBePaid
					daysUntilPaymentPossible
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

const EVENT_REVIEW = gql`
	query($id: ID!, $hash: String!) {
		event(id: $id, hash: $hash) {
			id
			review {
				id
				content
				rating
			}
			chosenGig {
				id
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
			paymentProvider
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
	mutation($gigId: ID!, $eventId: ID!) {
		paymentConfirmed(gigId: $gigId, eventId: $eventId) @client
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

const CANCEL_EVENT = gql`
	mutation CancelEvent($id: ID!, $hash: String!) {
		cancelEvent(id: $id, hash: $hash)
	}
`;

const UPDATE_EVENT = gql`
	mutation UpdateEvent(
		$id: ID!
		$hash: String!
		$name: String
		$description: String
		$contactEmail: String
		$contactName: String
		$contactPhone: String
		$speakers: Boolean
		$lights: Boolean
		$genres: [String!]
		$guestsCount: Int
		$locale: String
	) {
		updateEvent(
			id: $id
			hash: $hash
			name: $name
			description: $description
			contactEmail: $contactEmail
			contactName: $contactName
			contactPhone: $contactPhone
			speakers: $speakers
			lights: $lights
			genres: $genres
			guestsCount: $guestsCount
		) {
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
			rider {
				lights
				speakers
			}
			location {
				name
				latitude
				longitude
			}
		}
	}
`;

const WRITE_REVIEW = gql`
	mutation WriteReview(
		$id: ID
		$gigId: ID!
		$content: String
		$rating: Float!
	) {
		writeReview(id: $id, gigId: $gigId, rating: $rating, content: $content) {
			id
			rating
			content
		}
	}
`;

export {
	UPDATE_EVENT,
	EVENT,
	REQUEST_PAYMENT_INTENT,
	PAYMENT_CONFIRMED,
	EVENT_GIGS,
	DECLINE_DJ,
	CANCEL_EVENT,
	WRITE_REVIEW,
	EVENT_REVIEW
};
