import React, { Component } from "react";
import ChatService from "../../../utils/ChatService";
import { authService as auth } from "../../../utils/AuthService";
import debounce from "lodash.debounce";
import "./index.css";
import LoadingPlaceholder from "../LoadingPlaceholder";
import moment from "moment";

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

  sendMessage = (declineOnContactInfo = false) => {
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

  render() {
    const {
      loading,
      messages,
      sending,
      newMessage,
      typingAnimation
    } = this.state;

    const { sender, showPersonalInformation, receiver } = this.props;

    const datedMessages = toDateGroups(messages);
    const lastMessage = messages[messages.length - 1];

    return (
      <div className="chat">
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
          {Object.entries(datedMessages).map(([time, messages]) => (
            <DateGroup
              key={time}
              messages={messages}
              time={time}
              sender={sender}
              receiver={receiver}
              showPersonalInformation={showPersonalInformation}
            />
          ))}
          {lastMessage && (
            <Status sender={sender} message={lastMessage} sending={sending} />
          )}
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
        {!this.props.hideComposer && (
          <MessageComposer
            newMessage={newMessage}
            sending={sending}
            sendMessage={this.sendMessage}
            handleChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

export const MessageComposer = ({
  newMessage,
  sending,
  sendMessage,
  handleChange
}) => (
  <form onSubmit={sendMessage}>
    <textarea
      onChange={handleChange}
      value={newMessage}
      onKeyPress={event => {
        if (event.which === 13 && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
        }
      }}
    />
    <button
      onClick={event => {
        event.preventDefault();
        sendMessage();
      }}
      disabled={sending}
      type="submit"
    >
      Send
    </button>
  </form>
);

const enrichMessages = ({ sender, receiver, messages }) => {
  return messages.map((msg, idx) => ({
    ...msg,
    isOwn: msg.from === sender.id,
    isLast: idx + 1 === messages.length,
    isFirst: idx === 0,
    image: msg.from === sender.id ? sender.image : receiver.image
  }));
};

const toDateGroups = messages => {
  let prevDate = new Date(0);
  let currentKey = null;

  return messages.reduce((dateGroups, msg) => {
    const msgDate = new Date(msg.createdAt);
    const insertDate = Math.floor((msgDate - prevDate) / 1000 / 60) > 60;

    prevDate = msgDate;

    if (insertDate) {
      currentKey = msgDate.getTime();

      return {
        ...dateGroups,
        [currentKey]: [msg]
      };
    } else {
      return {
        ...dateGroups,
        [currentKey]: [...dateGroups[currentKey], msg]
      };
    }
  }, {});
};

const toSenderGroup = messages => {
  let currentSender = null;
  let currentGroupKey = 0;

  return messages.reduce((senderGroups, msg) => {
    const isNewGroup = currentSender !== msg.from;
    currentSender = msg.from;

    if (isNewGroup) {
      currentGroupKey += 1;
      return {
        ...senderGroups,
        [currentGroupKey]: [msg]
      };
    } else {
      return {
        ...senderGroups,
        [currentGroupKey]: [...senderGroups[currentGroupKey], msg]
      };
    }
  }, {});
};

const DateGroup = ({
  messages,
  time,
  sender,
  receiver,
  showPersonalInformation
}) => {
  const date = moment.unix(time / 1000);
  const isToday = moment().diff(date, "days") === 0;
  const formatted = isToday ? date.format("LT") : date.format("LL");

  const groupedMessages = toSenderGroup(messages);
  return (
    <div>
      <p className="messages-date" placeholder>
        {formatted}
      </p>

      {Object.entries(groupedMessages).map(([senderId, messages], idx) => (
        <SenderGroup
          key={time + "-" + idx}
          messages={messages}
          receiver={receiver}
          sender={sender}
          showPersonalInformation={showPersonalInformation}
        />
      ))}
    </div>
  );
};

const SenderGroup = ({
  messages,
  sender,
  receiver,
  showPersonalInformation
}) => {
  const enrichedMessages = enrichMessages({ sender, receiver, messages });

  return (
    <div className="sender-group">
      {enrichedMessages.map(m => (
        <Message
          key={m._id}
          {...m}
          showPersonalInformation={showPersonalInformation}
        />
      ))}
    </div>
  );
};

const Message = ({
  idx,
  content,
  isOwn,
  isFirst,
  isLast,
  typingAnimation,
  containsNumber,
  containsURL,
  containsEmail,
  showPersonalInformation,
  sending,
  image
}) => {
  const showNotice = containsEmail || containsNumber || containsURL;

  const cornerStyle = isOwn
    ? {
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: isLast ? "20px" : "2px",
        borderTopRightRadius: isFirst ? "20px" : "2px"
      }
    : {
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        borderBottomLeftRadius: isLast ? "20px" : "2px",
        borderTopLeftRadius: isFirst ? "20px" : "2px"
      };

  return (
    <div className="message-wrapper" key={`message-${idx}`}>
      <div className={`message ${isOwn ? "send" : "received"}`}>
        {isLast && (
          <div className="rounded">
            <img
              alt={isOwn ? "your picture" : "receiver picture"}
              src={image}
            />
          </div>
        )}
        <div className={`speech-bubble`} style={cornerStyle}>
          {content}
        </div>
      </div>
      {!showPersonalInformation && showNotice && (
        <div className="message-info">Information visible after payment</div>
      )}
    </div>
  );
};

const Status = ({ sending, message, sender }) => {
  if (message && message.from !== sender.id) {
    return null;
  }
  const status = sending ? "Sending" : message.read ? "Seen" : "Delivered";

  return (
    <div className="message-info">
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
        {status}
      </span>
    </div>
  );
};

export default Chat;
