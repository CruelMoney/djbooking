import io from 'socket.io-client';
import {Environment} from '../constants/constants'

export default class NotificationService {
    constructor() {
        this.domain = Environment.CHAT_DOMAIN;
        this.notificationHandlers = []
    }

    init(userId){
        if(!this.socket){
            this.socket = io(Environment.CHAT_DOMAIN+'?userId='+userId)

            this.socket.on('new notification', (notification)=>{
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