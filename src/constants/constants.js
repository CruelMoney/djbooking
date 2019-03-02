var frank = require("../assets/images/frank-hansen.png");
var martinE = require("../assets/images/martin-edvardsen.png");
var martin = require("../assets/images/martin.jpg");
var simon = require("../assets/images/simon.jpg");
var oliver = require("../assets/images/oliver.jpg");
var mads = require("../assets/images/mads.jpg");
var emma = require("../assets/images/emma.jpg");
var mussa = require("../assets/images/musa.jpg");
var jan = require("../assets/images/jan.png");
var peter = require("../assets/images/peter.png");
var keyMirror = require("keymirror");

const production = process.env.NODE_ENV === "production";
console.log(process.env.NODE_ENV)
module.exports = {
	Environment: {
		STRIPE_PUBLIC_KEY: production
			? process.env.REACT_APP_STRIPE_PROD_PUB_KEY
			: process.env.REACT_APP_STRIPE_DEV_PUB_KEY,
		AUTH0_CLIENT_ID: production
			? process.env.REACT_APP_AUTH0_PROD_CLIENTID
			: process.env.REACT_APP_AUTH0_DEV_CLIENTID,
		AUTH0_CLIENT_DOMAIN: production
			? process.env.REACT_APP_AUTH0_PROD_DOMAIN
			: process.env.REACT_APP_AUTH0_DEV_DOMAIN,
		AUTH0_AUDIENCE: production
			? process.env.REACT_APP_AUTH0_PROD_AUDIENCE
			: process.env.REACT_APP_AUTH0_DEV_AUDIENCE,
		CALLBACK_DOMAIN: production
			? process.env.REACT_APP_CUEUP_PROD_CALLBACK_DOMAIN
			: process.env.REACT_APP_CUEUP_DEV_CALLBACK_DOMAIN,
		API_DOMAIN: production
			? process.env.REACT_APP_CUEUP_PROD_API_DOMAIN
			: process.env.REACT_APP_CUEUP_DEV_API_DOMAIN,
		CHAT_DOMAIN: production
			? process.env.REACT_APP_CUEUP_PROD_CHAT_DOMAIN
			: process.env.REACT_APP_CUEUP_DEV_CHAT_DOMAIN,
		FACEBOOK_ID: production
			? process.env.REACT_APP_CUEUP_PROD_FB_ID
			: process.env.REACT_APP_CUEUP_DEV_FB_ID,
		PIXEL_ID: "1461498583979582",
		OPENEXCHANGERATE_APP_ID: "e0937d01cc734837bba7f1bfb6887c2a",
		GOOGLE_API_KEY: "AIzaSyAQNiY4yM2E0h4SfSTw3khcr9KYS0BgVgQ"
	},

	Currencies: ["DKK", "EUR", "GBP", "NOK", "SEK", "USD", "IDR"],
	OrganizerCurrencies: ["DKK", "EUR", "GBP", "NOK", "SEK", "USD", "IDR"],

	ActionTypes: keyMirror({
		// Session
		SIGNUP_REQUESTED: null,
		SIGNUP_SUCCEEDED: null,
		SIGNUP_FAILED: null,

		LOGIN_REQUESTED: null,
		LOGIN_REQUESTED_REDIRECT: null,
		LOGIN_SUCCEEDED: null,
		LOGIN_FAILED: null,

		LOGOUT_SUCCEEDED: null,

		UPDATEPROFILE_REQUESTED: null,
		UPDATEPROFILE_SUCCEEDED: null,
		UPDATEPROFILE_FAILED: null,

		UPDATE_PROFILE_VALUE: null,
		UPDATE_PROFILE_META_VALUE: null,
		RESET_PROFILE: null,

		DELETE_PROFILE_REQUESTED: null,
		DELETE_PROFILE_FAILED: null,
		DELETE_PROFILE_SUCCEEDED: null,

		TOGGLE_EDIT_MODE: null,

		FETCH_USER_REQUESTED: null,
		FETCH_USER_SUCCEEDED: null,
		FETCH_USER_FAILED: null,

		// Routes
		REDIRECT: null,

		FORM_UPDATE_VALUE: null,
		FORM_UPDATE_FILTERS: null,
		FORM_RESET: null,
		SET_SIGNUP: null,
		FORM_SUBMIT_REQUESTED: null,
		FORM_SUBMIT_FAILED: null,
		FORM_SUBMIT_SUCCEEDED: null,
		FORM_RESET_STATUS: null,

		FETCH_EVENTS_REQUESTED: null,
		FETCH_EVENTS_SUCCEEDED: null,
		FETCH_EVENTS_FAILED: null,

		FETCH_GIGS_REQUESTED: null,
		FETCH_GIGS_SUCCEEDED: null,
		FETCH_GIGS_FAILED: null,
		GIG_DECLINED: null,
		GIG_CANCELLED: null,
		GIG_OFFER_UPDATED: null,

		FETCH_GIG_REQUESTED: null,
		FETCH_GIG_SUCCEEDED: null,
		FETCH_GIG_FAILED: null,

		FETCH_REVIEWS_REQUESTED: null,
		FETCH_REVIEWS_SUCCEEDED: null,
		FETCH_REVIEWS_FAILED: null,

		CREATE_EVENT_REQUESTED: null,
		CREATE_EVENT_FAILED: null,
		CREATE_EVENT_SUCCEEDED: null,

		CHECK_EMAIL_REQUESTED: null,
		CHECK_EMAIL_FAILED: null,
		CHECK_EMAIL_SUCCEEDED: null,

		UPDATE_GEOLOCATION: null,

		REMOVE_MENU_ITEM: null,
		REGISTER_MENU_ITEM: null,

		TOGGLE_PUBLIC_PROFILE: null,

		CHANGE_CURRENCY: null,
		SET_GEO_SESSION: null,

		NOTIFICATIONS_REQUESTED: null,
		NOTIFICATIONS_SUCCEEDED: null,
		NOTIFICATIONS_FAILED: null,
		NEW_NOTIFICATION: null,
		NOTIFICATION_SEEN: null,
		ROOM_SEEN: null,

		PUSH_PROMISE: null
	}),
	GENRES: [
		"80's",
		"90's",
		"00's",
		"R&B",
		"Hip Hop",
		"Reggae",
		"Disco",
		"Rock",
		"Techno",
		"House",
		"Lounge",
		"Top 40",
		"Remixes",
		"Latin",
		"Local",
		"Vinyl"
	],
	WEEKDAYS: [
		{ name: "Monday" },
		{ name: "Tuesday" },
		{ name: "Wednesday" },
		{ name: "Thursday" },
		{ name: "Friday" },
		{ name: "Saturday" },
		{ name: "Sunday" }
	],
	NOTIFICATIONS: [
		{ name: "Gig request" },
		{ name: "Gig reminder" },
		{ name: "Gig paid" },
		{ name: "Queup news" },
		{ name: "New review" }
	],
	CUSTOMER_NOTIFICATIONS: [{ name: "DJ offer" }, { name: "Queup news" }],

	DJs: [
		{
			name: "Oscar",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Disco", "Lounge", "House"],
			img:
				"https://cueup.azurewebsites.net/images/profilePicture/Oscar-Bandersen.png"
		},
		{
			name: "Frank",
			location: {
				city: "Århus",
				country: "Denmark"
			},
			genres: ["Top 40", "80s", "90s", "00s"],
			img: frank
		},
		{
			name: "Martin",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Hip Hop", "Top 40", "Remixes"],
			img: martinE
		},
		{
			name: "Simon",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["90s", "00s", "RnB", "Top 40"],
			img: simon
		},
		{
			name: "Emma",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Disco", "80s", "90s", "RnB"],
			img: emma
		},
		{
			name: "Musa",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Hip Hop", "Techno", "Top 40", "Latin"],
			img: mussa
		},
		{
			name: "Martin",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Top 40", "Local", "Hip Hop", "90s"],
			img: martin
		},

		{
			name: "Christopher",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["RnB", "Pop", "House", "Hip Hop"],
			img: "https://cueup.azurewebsites.net/images/profilePicture/chris.png"
		},
		{
			name: "Andreas",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Lounge", "UKG", "House"],
			img: jan
		},
		{
			name: "Peter",
			location: {
				city: "Århus",
				country: "Denmark"
			},
			genres: ["Reggae", "Hip Hop", "Rock"],
			img: peter
		},
		{
			name: "Andrew",
			location: {
				city: "London",
				country: "UK"
			},
			genres: ["R&B", "90's", "UKG", "House"],
			img:
				"https://api.cueup.io/uploads/images/profilePicture/Andrew-Roberts.png"
		},
		{
			name: "Oliver",
			location: {
				city: "Odense",
				country: "Denmark"
			},
			genres: ["House", "Remixes", "80's", "Top 40"],
			img: oliver
		},
		{
			name: "Chris",
			location: {
				city: "Singapore",
				country: ""
			},
			genres: ["Lounge", "Hip Hop", "Top 40", "Remixes"],
			img:
				"https://cueup.azurewebsites.net/images/profilePicture/Chris-Delaney.png"
		},
		{
			name: "Kenneth",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Lounge", "Hip Hop", "R&B", "80's"],
			img:
				"https://cueup.azurewebsites.net/images/profilePicture/Kenneth-Riis.png"
		},
		{
			name: "Lukas",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["House", "Remixes", "Lounge"],
			img:
				"https://cueup.azurewebsites.net/images/profilePicture/Lukas-Grubb-Jensen.png"
		},
		{
			name: "Christian",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Top 40", "80's", "Disco", "House"],
			img:
				"https://cueup.azurewebsites.net/images/profilePicture/Christian-Lindquist-Hansen.png"
		},
		{
			name: "Calvert",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Remixes", "House", "Techno", "Trap"],
			img:
				"https://cueup.azurewebsites.net/images/profilePicture/mathias-koelle.png"
		},

		// {
		//     name:"Martin",
		//     location: "Sønderborg, Denmark",
		//     genres: ["Latin", "80's", "Top 40"],
		//     img: 'https://cueup.azurewebsites.net/images/profilePicture/martin-stauner-.png'
		// },

		{
			name: "Emil",
			location: {
				city: "Copenhagen",
				country: "Denmark"
			},
			genres: ["Remixes", "Techno"],
			img: "https://i1.sndcdn.com/avatars-000077812094-dqnrqd-large.jpg"
		},

		{
			name: "Mads",
			location: {
				city: "Århus",
				country: "Denmark"
			},
			genres: ["Top 40", "Hip Hop", "R&B"],
			img: mads
		}
	]
};
