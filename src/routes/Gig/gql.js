import gql from "graphql-tag";

const GIG = gql`
  query($id: ID!, $locale: String) {
    gig(id: $id) {
      id
      status
      statusHumanized
      offer {
        offer {
          amount
          currency
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
        discount
        cancelationPolicy {
          percentage
          days
        }
      }
      event {
        id
        name
        guestsCount
        contactEmail
        contactName
        contactPhone
        start {
          localDate
          formattedDate
          formattedTime
        }
        end {
          localDate
          formattedDate
          formattedTime
        }
        genres
        description
        location {
          latitude
          longitude
          name
        }
        rider {
          speakers
          lights
          formatted
        }
        organizer {
          id
          picture {
            path
          }
          userMetadata {
            firstName
          }
        }
        duration {
          formatted
        }
      }
    }
  }
`;
export { GIG };
