import { useEffect, useRef } from "react";
import { useApolloClient } from "react-apollo";
import { authService } from "./AuthService";

export const useLogout = () => {
	const client = useApolloClient();

	return async () => {
		authService.logout();
		client.writeData({ data: { me: null } });
	};
};


