import React, { useCallback, useRef, useEffect, useState } from "react";
import ChatService from "../../../utils/ChatService";
import { authService as auth } from "../../../utils/AuthService";
import debounce from "lodash.debounce";
import "./index.css";
import LoadingPlaceholder from "../LoadingPlaceholder";
import moment from "moment";
import SendIcon from "react-ionicons/lib/MdSend";

export const useChat = ({
  sender,
  receiver,
  id,
  showPersonalInformation,
  data
}) => {
  const chat = useRef();
  const startedTyping = useRef();
  const stoppedTyping = useRef();
  const onNewContent = useRef();
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [ready, setReady] = useState(false);
  const [typing, setTyping] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const addNewMessage = useCallback((message, sending = false, cb) => {
    setMessages(messages => [
      ...messages,
      {
        ...message,
        createdAt: new Date()
      }
    ]);
    setNewMessage("");
    setSending(sending);
    onNewContent.current && onNewContent.current(message);
  }, []);

  useEffect(() => {
    const newChat = new ChatService(id, auth.getToken(), sender.id);

    chat.current = newChat;

    newChat.init({ showPersonalInformation }).then(messages => {
      setMessages(messages);
      setReady(true);
      onNewContent.current && onNewContent.current();
    });

    startedTyping.current = debounce(newChat.startedTyping, 1000, {
      leading: true,
      trailing: false
    });
    stoppedTyping.current = debounce(newChat.stoppedTyping, 4000);

    const receiverReadMessages = () => {
      setMessages(messages => [
        ...messages.map(msg => {
          return { ...msg, read: true };
        })
      ]);
    };

    newChat.receiverStoppedTyping = () => setTyping(false);
    newChat.receiverStartedTyping = () => setTyping(true);
    newChat.onNewMessage = addNewMessage;
    newChat.receiverReadMessages = receiverReadMessages;

    return () => {
      ready && newChat.dispose();
    };
  }, [id, sender, receiver, showPersonalInformation, addNewMessage, ready]);

  const sendMessage = (declineOnContactInfo = false) => {
    const message = {
      content: newMessage,
      to: receiver.id,
      room: String(id),
      from: sender.id,
      declineOnContactInfo,
      ...data
    };

    // First set the message optimisticly
    addNewMessage(message, true);

    // Then send the message
    chat.current.sendMessage(message).then(_ => setSending(false));
  };

  const handleChange = event => {
    startedTyping.current();
    setNewMessage(event.target.value);
    stoppedTyping.current();
  };

  return {
    sending,
    ready,
    typing,
    messages,
    sendMessage,
    handleChange,
    newMessage,
    onNewContent
  };
};

const Chat = ({
  sender,
  showPersonalInformation,
  receiver,
  placeholder,
  hideComposer,
  chat
}) => {
  const messagesContainer = useRef();

  const { sending, typing, messages, ready, onNewContent } = chat;

  const scrollToBottom = () => {
    messagesContainer.current && messagesContainer.current.scrollTo(0, 999999);
  };

  useEffect(() => {
    onNewContent.current = scrollToBottom;
    return () => (onNewContent.current = null);
  }, [onNewContent]);

  const datedMessages = toDateGroups(messages);
  const lastMessage = messages[messages.length - 1];

  return (
    <div className="chat">
      <div ref={messagesContainer} className="messages">
        {!ready ? (
          <>
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </>
        ) : messages.length > 0 ? null : (
          placeholder
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
        {typing ? (
          <div className="message received">
            <div className="rounded">
              <img alt={"receiver"} src={receiver.image} />
            </div>
            <div className="speech-bubble typing-indicator">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}
      </div>
      {!hideComposer && (
        <MessageComposer chat={chat} placeholder={placeholder} />
      )}
    </div>
  );
};

export const MessageComposer = ({ chat, placeholder }) => (
  <form onSubmit={chat.sendMessage} className="message-composer">
    <div className="input-wrapper">
      <div
        contentEditable
        placeholder={placeholder}
        className="message-input"
        onChange={chat.handleChange}
        value={chat.newMessage}
        onKeyPress={event => {
          if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            chat.sendMessage();
          }
        }}
      />
    </div>
    <button
      onClick={event => {
        event.preventDefault();
        chat.sendMessage();
      }}
      disabled={chat.sending}
      type="submit"
    >
      <SendIcon fontSize="28px" color="#03d1ff" />
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

const WithChat = props => {
  const { sender, receiver, chatId, showPersonalInformation, eventId } = props;
  const chat = useChat({
    sender,
    receiver,
    id: chatId,
    showPersonalInformation,
    data: {
      eventId
    }
  });

  return <Chat {...props} chat={chat} />;
};

const Wrapper = props => {
  const { chat } = props;

  if (!chat) {
    return <WithChat {...props} />;
  }

  return <Chat {...props} />;
};

export default Wrapper;
