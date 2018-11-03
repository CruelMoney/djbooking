import { Environment } from "../constants/constants";
import io from "socket.io-client";
import store from "../store";
import * as actions from "../actions/NotificationsActions";

export default class ChatService {
	constructor(chatId, token, senderId) {
		console.log("connecting to: ", Environment.CHAT_DOMAIN + "?room=" + chatId);
		this.domain = Environment.CHAT_DOMAIN;
		this.chatId = chatId;
		this.token = token;
		this.senderId = senderId;
	}

	init() {
		return new Promise((resolve, reject) => {
			this.socket = io(
				Environment.CHAT_DOMAIN +
					"?room=" +
					this.chatId +
					"&token=" +
					this.token
			);

			this.socket.on("initialize chat", data => {
				resolve(data);
				this.readMessages();
			});
			this.socket.on("new message", message => {
				!!this.onNewMessage && this.onNewMessage(message);
				this.readMessages();
			});
			this.socket.on("started typing", () => {
				!!this.receiverStartedTyping && this.receiverStartedTyping();
			});
			this.socket.on("stopped typing", () => {
				!!this.receiverStoppedTyping && this.receiverStoppedTyping();
			});
			this.socket.on("messages read", () => {
				!!this.receiverReadMessages && this.receiverReadMessages();
			});
		});
	}

	sendMessage(message) {
		return new Promise((resolve, reject) => {
			this.socket.emit("send message", message, response => {
				if (response.error) {
					console.log(response);
					return reject(response);
				} else {
					return resolve(response);
				}
			});
		});
	}

	dispose() {
		return this.socket.close();
	}

	startedTyping = () => {
		this.socket.emit("started typing");
	};
	stoppedTyping = () => {
		this.socket.emit("stopped typing");
	};

	readMessages = () => {
		this.socket.emit("messages read", this.senderId);
		store.dispatch(actions.seenRoom(this.chatId));
	};
}
