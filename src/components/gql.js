import gql from "graphql-tag";

const ME = gql`
	query Me {
		me {
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
			appMetadata {
				averageRating
				experience
				earned {
					amount
					currency
				}
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

const LOGIN = gql`
	mutation Signin($email: EmailAddress!, $password: String!) {
		signIn(email: $email, password: $password) {
			token
		}
	}
`;

const CREATE_USER = gql`
	mutation CreateUser(
		$email: EmailAddress!
		$password: String!
		$firstName: String!
		$lastName: String!
		$playingLocation: Area!
		$genres: [String!]!
		$experienceLevel: ExperienceLevel
		$bio: String!
		$redirectLink: String!
	) {
		signUp(
			email: $email
			password: $password
			redirectLink: $redirectLink
			firstName: $firstName
			lastName: $lastName
			playingLocation: $playingLocation
			genres: $genres
			experienceLevel: $experienceLevel
			bio: $bio
		)
	}
`;

const EMAIL_IS_TAKEN = gql`
	query EmailIsUsed($email: String!) {
		emailIsUsed(email: $email)
	}
`;

const REQUEST_EMAIL_VERIFICATION = gql`
	mutation requestVerifyEmail($email: EmailAddress!, $redirectLink: String!) {
		requestVerifyEmail(email: $email, redirectLink: $redirectLink)
	}
`;

const REQUEST_PASSWORD_RESET = gql`
	mutation requestPasswordReset($email: EmailAddress!, $redirectLink: String!) {
		requestPasswordReset(email: $email, redirectLink: $redirectLink)
	}
`;

const RESET_PASSWORD = gql`
	mutation resetUserPassword($token: String!, $password: String!) {
		resetUserPassword(passwordResetToken: $token, password: $password) {
			token
		}
	}
`;

const VERIFY_EMAIL = gql`
	mutation resetUserPassword($verifyToken: String!) {
		verifyEmail(verifyToken: $verifyToken)
	}
`;

export {
	LOGIN,
	ME,
	REQUEST_PASSWORD_RESET,
	RESET_PASSWORD,
	CREATE_USER,
	REQUEST_EMAIL_VERIFICATION,
	VERIFY_EMAIL
};
