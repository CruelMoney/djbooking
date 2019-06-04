import gql from "graphql-tag";

const CHECK_DJ_AVAILABILITY = gql`
	mutation DjsAvailable($location: Area!, $startTime: DateTime!) {
		djsAvailable(location: $location, date: $startTime)
	}
`;

const CREATE_EVENT = gql`
	mutation CreateEvent(
		$name: String!
		$description: String!
		$contactEmail: String!
		$contactName: String!
		$contactPhone: String
		$speakers: Boolean
		$lights: Boolean
		$startTime: DateTime!
		$endTime: DateTime!
		$genres: [String!]!
		$guestsCount: Int!
		$location: Area!
		$timeZone: String
	) {
		createEvent(
			name: $name
			description: $description
			contactEmail: $contactEmail
			contactName: $contactName
			contactPhone: $contactPhone
			speakers: $speakers
			lights: $lights
			start: $startTime
			end: $endTime
			timeZone: $timeZone
			genres: $genres
			guestsCount: $guestsCount
			location: $location
		)
	}
`;

export { CHECK_DJ_AVAILABILITY, CREATE_EVENT };
