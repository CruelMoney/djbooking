import io from 'socket.io-client';
import {Environment} from '../constants/constants'
import {store} from '../Router'
import * as actions from '../actions/NotificationsActions'

export default class NotificationService {
    constructor() {
        this.domain = Environment.CHAT_DOMAIN;
        this.notificationHandlers = []
    }

    init(userId){
        if(!this.socket && userId){
            console.log('connecting to: ', Environment.CHAT_DOMAIN+'?userId='+userId)
            this.socket = io(Environment.CHAT_DOMAIN+'?userId='+userId)

            this.socket.on('initialize notifications', (notifications)=>{
                store.dispatch(
                    actions.fetchedNotifications(notifications)
                );
            })

            this.socket.on('new notification', (notification)=>{
                store.dispatch(
                    actions.newNotification(notification)
                );
                this.notificationHandlers.reduce((acc, fn) => {
                    return fn(notification);
                }, 0);
            });
        }
    }

    addNotificationHandler = (handler) =>{
        this.notificationHandlers.push(handler);
    }

    // Not mutation safe
    removeNotificationHandler = (handler) =>{
        const idx = this.notificationHandlers.indexOf(handler);
        this.notificationHandlers.splice(idx, 1);
    }

    reset = () => {
        this.notificationHandlers = []
    }

    getChatStatus = () => {
        return new Promise((resolve, reject)=>{
            this.socket.emit('get chat status', response => {
                if(response.error){        
                    console.log(response)            
                    return reject(response);
                }else{
                    return resolve(response);
                }
            });
        });
    }

}

// Singleton pattern
export let notificationService = new NotificationService();