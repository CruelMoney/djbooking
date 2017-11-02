import c from '../constants/constants'
var ActionTypes = c.ActionTypes

export function newNotification(notification) {
  return {
    type: ActionTypes.NEW_NOTIFICATION,
    notification: notification
  }
}

export function seenNotification(notification) {
  return {
    type: ActionTypes.NOTIFICATION_SEEN,
    notification: notification
  }
}


export function fetchedNotifications(notifications) {
  return {
    type: ActionTypes.NOTIFICATIONS_SUCCEEDED,
    notifications:notifications
  }
}