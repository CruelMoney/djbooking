import { EventEmitter } from "events";

class AuthService extends EventEmitter {
	setSession(token) {
		// Set the time that the access token will expire at
		localStorage.setItem("token", token);
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem("token");
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
