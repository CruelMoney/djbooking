import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { Environment } from "./constants/constants";
import resolvers from "./actions/resolvers";
// custome error handling, only logging errors atm
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward, response }) => {
		if (graphQLErrors) {
			// do something with graphql error
			graphQLErrors.map(({ message, path }) =>
				console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
			);

			for (let err of graphQLErrors) {
				// handle errors differently based on its error code
				switch (err.extensions.code) {
					case "UNAUTHENTICATED":
						// old token might have expired, lets remove it and try again
						window.localStorage.removeItem("auth_token");
						const headers = operation.getContext().headers;
						operation.setContext({
							headers: {
								...headers,
								"x-token": null
							}
						});
						return forward(operation);

					// handle other errors
					default:
						break;
				}
			}
		}

		if (networkError) {
			// do something with network error
			console.warn({ networkError });
		}
	}
);

let token;
const withToken = setContext(async (_, { headers }) => {
	// get token if not present
	if (!token) {
		try {
			const userToken = window.localStorage.getItem("auth_token");
			token = userToken;
		} catch (error) {
			console.warn(error);
		}
	}
	console.log({ token });
	return {
		headers: {
			...headers,
			"x-token": token ? `${token}` : ""
		}
	};
});

const resetToken = onError(({ networkError }) => {
	if (
		networkError &&
		networkError.name === "ServerError" &&
		networkError.statusCode === 401
	) {
		// remove cached token on 401 from the server
		token = null;
	}
});

const authFlowLink = withToken.concat(resetToken);

const cache = new InMemoryCache();

const httpLink = new HttpLink({
	uri: Environment.GQL_DOMAIN
});

const uploadLink = createUploadLink({ uri: Environment.GQL_DOMAIN });

const link = ApolloLink.from([errorLink, authFlowLink, uploadLink, httpLink]);

const client = new ApolloClient({
	cache,
	link,
	connectToDevTools: true,
	resolvers
});

const reset = async () => {
	token = null;
	window.localStorage.removeItem("auth_token");
	await client.resetStore();
};

class APIProvider extends Component {
	constructor(props) {
		super(props);
		this.state = { isHydratingStore: false };
	}

	render() {
		return (
			<ApolloProvider client={client}>{this.props.children}</ApolloProvider>
		);
	}
}

export default APIProvider;

export { reset };
