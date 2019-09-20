import { useRef, useEffect, useState, useCallback } from "react";
import ChatService from "../../../utils/ChatService";
import { authService as auth } from "../../../utils/AuthService";
import debounce from "lodash.debounce";

const useChat = ({ sender, receiver, id, showPersonalInformation, data }) => {
  const chat = useRef();
  const initializing = useRef(false);
  const startedTyping = useRef();
  const stoppedTyping = useRef();
  const onNewContent = useRef();
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [ready, setReady] = useState(false);
  const [typing, setTyping] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const senderId = sender.id;

  const addNewMessage = useCallback((message, sending = false, cb) => {
    setMessages(messages => [
      ...messages,
      {
        ...message,
        createdAt: new Date()
      }
    ]);
    setSending(sending);
    onNewContent.current && onNewContent.current(message);
  }, []);

  useEffect(() => {
    if (!ready && !initializing.current) {
      initializing.current = true;
      const newChat = new ChatService(id, auth.getToken(), senderId);

      newChat.init({ showPersonalInformation }).then(messages => {
        setMessages(messages);
        setReady(true);
        onNewContent.current && onNewContent.current();
        chat.current = newChat;
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
        console.log("Disposing");
        chat.current && chat.current.dispose();
      };
    }
  }, [id, showPersonalInformation, addNewMessage, ready, senderId, sender]);

  const sendMessage = (declineOnContactInfo = false) => {
    if (!newMessage || !newMessage.trim()) {
      return;
    }
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
    setNewMessage("");

    // Then send the message
    chat.current.sendMessage(message).then(_ => setSending(false));
  };

  const handleChange = text => {
    startedTyping.current();
    setNewMessage(text);
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

export default useChat;
