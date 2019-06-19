import React, { Component } from "react";
import ChatService from "../../../utils/ChatService";
import { authService as auth } from "../../../utils/AuthService";
import debounce from "lodash.debounce";
import Popup from "../Popup";
import "./index.css";
import Button from "../Button-v2";
import LoadingPlaceholder from "../LoadingPlaceholder";
class Chat extends Component {
	chat = null;
	auth = null;
	messagesContainer = null;
	typingAnimationInterval = null;

	state = {
		ready: false,
		messages: [],
		newMessage: "",
		typingAnimation: false,
		showPopup: false,
		loading: true
	};

	componentDidMount() {
		this.chat = new ChatService(
			this.props.chatId,
			auth.getToken(),
			this.props.sender.id
		);

		this.chat
			.init({ showPersonalInformation: this.props.showPersonalInformation })
			.then(messages => {
				this.setState(
					{
						ready: true,
						messages: messages,
						showPopup: messages.some(
							msg => msg.containsEmail || msg.containsNumber
						),
						loading: false
					},
					this.scrollToBottom
				);
			});

		this.startedTyping = debounce(this.chat.startedTyping, 1000, {
			leading: true,
			trailing: false
		});
		this.stoppedTyping = debounce(this.chat.stoppedTyping, 4000);

		this.chat.onNewMessage = this.addNewMessage;
		this.chat.receiverStoppedTyping = this.receiverStoppedTyping;
		this.chat.receiverStartedTyping = this.receiverStartedTyping;
		this.chat.receiverReadMessages = this.receiverReadMessages;
	}

	componentWillUnmount() {
		this.chat.dispose();
	}

	scrollToBottom = () => {
		this.messagesContainer && this.messagesContainer.scrollTo(0, 999999);
	};

	addNewMessage = (message, sending = false) => {
		this.setState(
			{
				messages: [
					...this.state.messages,
					{
						...message,
						createdAt: new Date()
					}
				],
				sending: sending
			},
			_ => {
				this.scrollToBottom();
				if (sending) {
					this.setState({
						newMessage: ""
					});
				}
			}
		);
	};

	receiverReadMessages = () => {
		this.setState({
			messages: [
				...this.state.messages.map(msg => {
					return { ...msg, read: true };
				})
			]
		});
	};

	removeLastMessage = () => {
		this.setState({
			messages: [
				...this.state.messages.splice(0, this.state.messages.length - 1)
			],
			sending: false
		});
	};

	sendMessage = (declineOnContactInfo = true) => {
		const og_message = this.state.newMessage;

		const data = {
			content: og_message,
			to: this.props.receiver.id,
			room: String(this.props.chatId),
			from: this.props.sender.id,
			eventId: this.props.eventId,
			declineOnContactInfo
		};

		// First set the message optimisticly
		this.addNewMessage(data, true);

		// Then send the message
		this.chat
			.sendMessage(data)
			.then(_ => this.setState({ sending: false }))
			// If error remove the message from chat again
			.catch(error => {
				console.log(error);
				if (error.status === 403) {
					this.setState({
						showPopup: true,
						newMessage: og_message,
						declinedMessage: true
					});
				}
				this.removeLastMessage();
			});
	};

	receiverStartedTyping = () => {
		this.setState(
			{
				typingAnimation: true
			},
			this.scrollToBottom
		);
	};
	receiverStoppedTyping = () => {
		this.setState({
			typingAnimation: false
		});
	};

	handleChange = event => {
		this.startedTyping();
		this.setState({
			newMessage: event.target.value
		});
		this.stoppedTyping();
	};

	hidePopup = () => {
		this.setState({
			showPopup: false,
			declinedMessage: false
		});
	};

	render() {
		const { ModalContent } = this.props;
		let prevDate = new Date(0);
		const {
			declinedMessage,
			loading,
			messages,
			showPopup,
			sending,
			newMessage,
			typingAnimation
		} = this.state;

		return (
			<div className="chat">
				<Popup showing={showPopup} onClickOutside={this.hidePopup}>
					<div>
						{ModalContent && (
							<ModalContent
								closeModal={this.hidePopup}
								hideButtons={declinedMessage}
							/>
						)}
						{declinedMessage && (
							<div className="flex">
								<Button
									glow
									active
									onClick={_ => {
										this.sendMessage(false);
										this.hidePopup();
									}}
								>
									Send message
								</Button>
								<Button glow active onClick={this.hidePopup}>
									Cancel
								</Button>
							</div>
						)}
					</div>
				</Popup>

				<div
					ref={ref => {
						this.messagesContainer = ref;
					}}
					className="messages"
				>
					{loading ? (
						<>
							<LoadingPlaceholder />
							<LoadingPlaceholder />
						</>
					) : messages.length > 0 ? null : (
						this.props.placeholder
					)}
					{messages.length > 0 &&
						messages.map((msg, idx) => {
							const own = this.props.sender.id === msg.from;
							const msgDate = new Date(msg.createdAt);
							const insertDate =
								Math.floor((msgDate - prevDate) / 1000 / 60) > 60;
							prevDate = msgDate;

							return (
								<div className="message-wrapper" key={`message-${idx}`}>
									{insertDate ? (
										<div className="timestamp">
											{msgDate.toLocaleString([], {
												day: "numeric",
												month: "numeric",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})}
										</div>
									) : null}
									<div className={`message ${own ? "send" : "received"}`}>
										<div className="rounded">
											<img
												alt={own ? "your picture" : "receiver picture"}
												src={
													own
														? this.props.sender.image
														: this.props.receiver.image
												}
											/>
										</div>
										<div className={`speech-bubble`}>{msg.content}</div>
									</div>
									<div className="message-info">
										{idx === messages.length - 1 && own ? (
											<span>
												{!sending ? (
													<svg
														width="12px"
														height="11px"
														viewBox="0 0 12 11"
														version="1.1"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g
															id="Page-1"
															stroke="none"
															strokeWidth="1"
															fill="none"
															fillRule="evenodd"
														>
															<g
																id="checkmark"
																transform="translate(0.000000, -1.000000)"
																fill="#cad2dc"
															>
																<path
																	d="M10.767,1.243 L3.65,8.53 L1.72,6.267 C0.878,5.537 -0.45,6.389 0.154,7.482 L2.444,11.447 C2.807,11.933 3.651,12.419 4.494,11.447 C4.857,10.961 11.731,2.337 11.731,2.337 C12.577,1.364 11.491,0.515 10.769,1.243 L10.767,1.243 Z"
																	id="Shape"
																/>
															</g>
														</g>
													</svg>
												) : null}
												{sending ? "Sending" : msg.read ? "Seen" : "Delivered"}
											</span>
										) : null}
									</div>
								</div>
							);
						})}
					{typingAnimation ? (
						<div className="message received">
							<div className="rounded">
								<img alt={"receiver"} src={this.props.receiver.image} />
							</div>
							<div className="speech-bubble typing-indicator">
								<span />
								<span />
								<span />
							</div>
						</div>
					) : null}
				</div>
				<form onSubmit={this.sendMessage}>
					<textarea
						onChange={this.handleChange}
						value={newMessage}
						onKeyPress={event => {
							if (event.which === 13 && !event.shiftKey) {
								event.preventDefault();
								this.sendMessage();
							}
						}}
					/>
					<button
						onClick={event => {
							event.preventDefault();
							this.sendMessage();
						}}
						disabled={sending}
						type="submit"
					>
						Send
					</button>
				</form>
			</div>
		);
	}
}

export default Chat;
