import { useCallback } from "react";
import { useApolloClient, useMutation } from "react-apollo";
import { authService } from "./AuthService";
import { CONNECT_INSTAGRAM, DISCONNECT_INSTAGRAM } from "../routes/User/gql";
import { Environment } from "../constants/constants";
import { ME } from "../components/gql";

export const useLogout = () => {
	const client = useApolloClient();

	return async () => {
		authService.logout();
		client.writeData({ data: { me: null } });
	};
};

export const useConnectInstagram = () => {
	const [mutate, { loading, ...rest }] = useMutation(CONNECT_INSTAGRAM, {
		update: (proxy, { data: { connectInstagram } }) => {
			const { me } = proxy.readQuery({
				query: ME
			});

			proxy.writeQuery({
				query: ME,
				data: {
					me: {
						...me,
						appMetadata: {
							...me.appMetadata,
							instagramConnected: true
						}
					}
				}
			});
		}
	});

	const [disconnect, { loading: disconnectLoading }] = useMutation(
		DISCONNECT_INSTAGRAM
	);

	const connect = useCallback(
		async args => {
			const { variables, ...options } = args || {};
			const { data } = await mutate({
				variables: {
					redirectLink: Environment.CALLBACK_DOMAIN,
					...variables
				},
				...options
			});
			if (!variables || !variables.code) {
				window.open(data.connectInstagram, "_blank");
			}
		},
		[mutate]
	);

	return [
		connect,
		{ loading: loading || disconnectLoading, disconnect, ...rest }
	];
};
