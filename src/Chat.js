import React, { useState, useEffect, useRef } from 'react';
import userIcon from './user_icon.svg';
import './styles/chat_interface.css';  
import './styles/window.css';

// SendButton Component
const SendButton = ({ handleClick }) => (
  <div className="send_message" onClick={handleClick}>
    <div className="text">Send</div>
  </div>
);

// MessageTextBoxContainer Component
const MessageTextBoxContainer = ({ message, onChange, _handleKeyPress }) => (
  <div className="message_input_wrapper">
    <input
      id="msg_input"
      className="message_input"
      placeholder="Type your messages here..."
      value={message}
      onChange={onChange}
      onKeyPress={_handleKeyPress}
    />
  </div>
);

// Avatar Component
const Avatar = () => (
  <div className="avatar">
    <div className='user_icon'>
      <img src={userIcon} alt='user' />
    </div>
  </div>
);

// UserMessageBox Component
const UserMessageBox = ({ message, appearance }) => (
  <li className={`message ${appearance} appeared`}>
    <Avatar />
    <div className="text_wrapper">
      <div className="text">{message}</div>
    </div>
  </li>
);

// MessagesContainer Component
const MessagesContainer = ({ messages }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const createBotMessages = () => {
    return messages.map((message, index) => (
      <UserMessageBox
        key={index}
        message={message.message}
        appearance={message.isbotmessage ? 'left' : 'right'}
      />
    ));
  };

  return (
    <ul className="messages" ref={scrollRef}>
      {createBotMessages()}
    </ul>
  );
};

// Chat Component
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const addMessageBox = (enter = true) => {
    if (currentMessage && enter) {
      const newMessages = [...messages, { message: currentMessage }];
      setMessages(newMessages);
      setCurrentMessage('');

      fetch(`http://localhost:5000?message=${currentMessage}`)
        .then(res => res.json())
        .then(
          (result) => {
            setMessages([...newMessages, { message: result.message, isbotmessage: true }]);
          },
          (error) => {
            // handle error
          }
        );
    }
  };

  const handleClick = () => {
    addMessageBox();
  };

  const onChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMessageBox(true);
    }
  };

  return (
    <div className="Chat">
      <div className="chat_window">
        <MessagesContainer messages={messages} />
        <div className="bottom_wrapper clearfix">
          <MessageTextBoxContainer
            _handleKeyPress={_handleKeyPress}
            onChange={onChange}
            message={currentMessage}
          />
          <SendButton handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
