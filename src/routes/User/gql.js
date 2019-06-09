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
			userSettings {
				standby
				cancelationPolicy {
					days
					percentage
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
		$playingLocation: Area
		$genres: [String!]
		$bio: String
		$redirectLink: String
	) {
		updateUser(
			id: $id
			email: $email
			redirectLink: $redirectLink
			firstName: $firstName
			lastName: $lastName
			picture: $picture
			playingLocation: $playingLocation
			genres: $genres
			bio: $bio
			phone: $phone
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
