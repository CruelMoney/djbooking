import gql from "graphql-tag";

const USER = gql`
	query($permalink: String!) {
		user(permalink: $permalink) {
			id
			auth0Id
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
			appMetadata {
				averageRating
				experience
				roles
			}
			userMetadata {
				firstName
				bio
				birthday
			}
		}
	}
`;

const UPDATE_USER = gql`
	mutation updateUser(
		$id: ID!
		$email: EmailAddress
		$password: String
		$firstName: String
		$lastName: String
		$picture: Upload
		$playingLocation: Area
		$genres: [String!]
		$bio: String
		$redirectLink: String
		$birthday: DateTime
		$standby: Boolean
		$cancelationDays: Int
		$refundPercentage: Int
		$payoutInfo: JSON
	) {
		updateUser(
			id: $id
			email: $email
			password: $password
			redirectLink: $redirectLink
			firstName: $firstName
			lastName: $lastName
			picture: $picture
			playingLocation: $playingLocation
			genres: $genres
			bio: $bio
			birthday: $birthday
			standby: $standby
			refundPercentage: $refundPercentage
			cancelationDays: $cancelationDays
			payoutInfo: $payoutInfo
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

export { USER, UPDATE_USER };
