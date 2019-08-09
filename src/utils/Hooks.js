import { useApolloClient } from "react-apollo";
import { authService } from "./AuthService";
export const useLogout = () => {
	const client = useApolloClient();

	return async () => {
		authService.logout();
		document.cookie = `x-token= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
		client.writeData({ data: { me: null } });
	};
};
