import gql from "graphql-tag";

const USER = gql`
	query User($permalink: String!) {
		user(permalink: $permalink) {
			id
			auth0Id
			permalink
			genres
			artistName
			email
			picture {
				path
			}
			coverPhoto {
				path
			}
			playingLocation {
				name
				radius
				longitude
				latitude
			}
			appMetadata {
				rating
				experience
				roles
				identityVerified
				certified
				createdAt
			}
			userMetadata {
				firstName
				lastName
				bio
				birthday
				phone
				bankAccount {
					status
				}
			}
			userSettings {
				standby
				cancelationPolicy {
					days
					percentage
				}
			}
			reviews {
				pageInfo {
					totalDocs
				}
			}
		}
	}
`;

const UPDATE_USER = gql`
	mutation updateUser(
		$id: ID!
		$email: EmailAddress
		$firstName: String
		$lastName: String
		$phone: String
		$picture: Upload
		$coverPhoto: Upload
		$playingLocation: Area
		$genres: [String!]
		$bio: String
		$redirectLink: String
		$birthday: DateTime
		$password: String
		$artistName: String
		$permalink: String
	) {
		updateUser(
			id: $id
			email: $email
			redirectLink: $redirectLink
			firstName: $firstName
			lastName: $lastName
			picture: $picture
			coverPhoto: $coverPhoto
			playingLocation: $playingLocation
			genres: $genres
			bio: $bio
			phone: $phone
			birthday: $birthday
			password: $password
			artistName: $artistName
			permalink: $permalink
		) {
			id
			auth0Id
			email
			permalink
			artistName
			genres
			picture {
				path
			}
			coverPhoto {
				path
			}
			playingLocation {
				name
				radius
				longitude
				latitude
			}
			userMetadata {
				firstName
				lastName
				bio
				birthday
				phone
			}
			userSettings {
				currency
				standby
				cancelationPolicy {
					days
					percentage
				}
			}
		}
	}
`;

const UPDATE_USER_SETTINGS = gql`
	mutation updateUser(
		$id: ID!
		$standby: Boolean
		$cancelationDays: Int
		$refundPercentage: Int
		$permalink: String
	) {
		updateUser(
			id: $id
			standby: $standby
			cancelationDays: $cancelationDays
			refundPercentage: $refundPercentage
			permalink: $permalink
		) {
			id
			auth0Id
			email
			permalink
			genres
			picture {
				path
			}
			playingLocation {
				name
				radius
				longitude
				latitude
			}
			userMetadata {
				firstName
				lastName
				bio
				birthday
				phone
			}
			userSettings {
				currency
				standby
				cancelationPolicy {
					days
					percentage
				}
			}
		}
	}
`;

const DECLINE_GIG = gql`
	mutation declineGig($id: ID!) {
		declineGig(id: $id) {
			id
			statusHumanized
			status
		}
	}
`;

const CANCEL_GIG = gql`
	mutation cancelGig($id: ID!) {
		cancelGig(id: $id) {
			id
			statusHumanized
			status
		}
	}
`;

const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id)
	}
`;

const GET_OFFER = gql`
	mutation GetOffer(
		$gigId: ID!
		$amount: Int!
		$currency: Currency!
		$locale: String
	) {
		getOffer(gigId: $gigId, amount: $amount, currency: $currency) {
			offer {
				amount
				formatted(locale: $locale)
			}
			serviceFee {
				amount
				formatted(locale: $locale)
			}
			djFee {
				amount
				formatted(locale: $locale)
			}
			totalPayment {
				amount
				formatted(locale: $locale)
			}
			totalPayout {
				amount
				formatted(locale: $locale)
			}
		}
	}
`;

const MAKE_OFFER = gql`
	mutation MakeOffer(
		$gigId: ID!
		$amount: Int!
		$currency: Currency!
		$locale: String
	) {
		makeOffer(gigId: $gigId, amount: $amount, currency: $currency) {
			offer {
				amount
				formatted(locale: $locale)
			}
			serviceFee {
				amount
				formatted(locale: $locale)
			}
			djFee {
				amount
				formatted(locale: $locale)
			}
			totalPayment {
				amount
				formatted(locale: $locale)
			}
			totalPayout {
				amount
				formatted(locale: $locale)
			}
		}
	}
`;

const MY_EVENTS = gql`
	query MyEvents {
		me {
			id
			events {
				edges {
					id
					name
					hash
					status
					location {
						name
					}
					start {
						formattedDate
					}
				}
			}
		}
	}
`;

export {
	MY_EVENTS,
	USER,
	UPDATE_USER,
	UPDATE_USER_SETTINGS,
	DECLINE_GIG,
	CANCEL_GIG,
	DELETE_USER,
	GET_OFFER,
	MAKE_OFFER
};
