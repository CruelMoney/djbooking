import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
import forms from "./Forms";
import user from "./User";
import gigs from "./Gigs";
import events from "./Events";
import reviews from "./Reviews";
import signup from "./Signup";
import login from "./Login";
import session from "./Session";
import notifications from "./Notifications";
import menu from "./Menu";
import { localeReducer as locale } from "react-localize-redux";

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	stateReconciler: autoMergeLevel2
// };

const store = combineReducers({
	forms,
	gigs,
	reviews,
	signup,
	events,
	menu,
	notifications,
	session,
	locale,
	// user: persistReducer(persistConfig, user),
	// login: persistReducer(persistConfig, login)
	user,
	login
});

const rootReducer = (state, action) => {
	return store(state, action);
};

export default rootReducer;
