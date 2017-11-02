import c from '../constants/constants'

var ActionTypes = c.ActionTypes

const initialState = { //define initial state - an empty form
    loading: false,
    error: false,
    data: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.NOTIFICATIONS_REQUESTED:
            return {
                ...state,
                error: false,
                loading: true,
            }

        case ActionTypes.NOTIFICATIONS_SUCCEEDED:
            return {
                ...state,
                data: action.notifications,
                error: false,
                loading: false,
            }

        case ActionTypes.NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
            }

        case ActionTypes.NEW_NOTIFICATION:
            return {
                ...state,
                data: [...state.data, action.notification]
            }

        case ActionTypes.NOTIFICATION_SEEN:{ 
            const idx = state.data.indexOf(action.notification)
            return {
                ...state,
                data: [
                    ...state.data.slice(0, idx),
                    ...state.data.slice(idx + 1)
                ],
            }
        }

        case ActionTypes.ROOM_SEEN:{
            const newData = state.data.filter(noti => {
                return String(noti.room) !== String(action.roomId)
            })
            return {
                ...state,
                data: newData,
            }
        }

        default:
            return state
    }
}