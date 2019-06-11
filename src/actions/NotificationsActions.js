import c from "../constants/constants";
var ActionTypes = c.ActionTypes;

export function newNotification(notification) {
	return {
		type: ActionTypes.NEW_NOTIFICATION,
		notification: notification
	};
}

export function seenNotification(notification) {
	return {
		type: ActionTypes.NOTIFICATION_SEEN,
		notification: notification
	};
}

export function seenRoom(roomId) {
	return {
		type: ActionTypes.ROOM_SEEN,
		roomId: roomId
	};
}

export function fetchingNotifications() {
	return {
		type: ActionTypes.NOTIFICATIONS_REQUESTED
	};
}

export function fetchedNotifications(notifications) {
	return {
		type: ActionTypes.NOTIFICATIONS_SUCCEEDED,
		notifications: notifications
	};
}
