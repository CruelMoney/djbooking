import gql from "graphql-tag";

const resolvers = {
	Mutation: {
		paymentConfirmed: (_root, variables, { cache, getCacheKey }) => {
			const id = getCacheKey({ __typename: "Gig", id: variables.gigId });
			const fragment = gql`
				fragment completeTodo on TodoItem {
					status
				}
			`;
			const gig = cache.readFragment({ fragment, id });
			const data = { ...gig, status: "CONFIRMED" };
			cache.writeData({ id, data });
			return null;
		}
	}
};

export default resolvers;
