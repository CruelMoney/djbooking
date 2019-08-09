import { EventEmitter } from "events";

class AuthService extends EventEmitter {
	setSession(token) {
		// Set the time that the access token will expire at
		localStorage.setItem("token", token);
		document.cookie = `x-token=${token}; expires = Thu, 01 Jan 2090 00:00:00 GMT`;
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem("token");
		document.cookie = `x-token=; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
	}

	loggedIn() {
		const token = this.getAccessToken();
		return !!token && token !== "undefined";
	}

	getAccessToken() {
		// Retrieves the user token from localStorage
		return localStorage.getItem("token");
	}

	getToken() {
		return this.getAccessToken();
	}
}

export let authService = new AuthService();
