import gql from "graphql-tag";

const EVENT = gql`
	query($id: ID!, $hash: String!, $currency: Currency) {
		event(id: $id, hash: $hash) {
			id
			gigs {
				id
				status
				offer {
					totalPayment(currency: $currency) {
						amount
						currency
						formatted
					}
					serviceFee(currency: $currency) {
						amount
						currency
						formatted
					}
					offer(currency: $currency) {
						amount
						currency
						formatted
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

export { EVENT };
