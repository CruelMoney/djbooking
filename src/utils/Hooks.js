import { useApolloClient } from "react-apollo";
import { authService } from "./AuthService";
import { Environment } from "../constants/constants";
export const useLogout = () => {
	const client = useApolloClient();

	return async () => {
		authService.logout();
		const cookieDomain = Environment.GQL_DOMAIN.replace(
			/(https:\/\/)|(http:\/\/)/,
			"."
		);
		document.cookie = `x-token= ; path=/; domain=${cookieDomain}; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
		client.writeData({ data: { me: null } });
	};
};
