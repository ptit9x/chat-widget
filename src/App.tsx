import React, { useState } from 'react';

interface Message {
  text: string;
  from: 'user' | 'bot';
}

interface ChatWidgetProps {
  initialMessages?: Message[];
  providerKey: string | null | undefined;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ initialMessages = [], providerKey }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  console.log(providerKey, 'providerKey');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim() === '') return;

    setMessages([...messages, { text: inputText, from: 'user' }]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      setMessages([...messages, { text: 'I am a bot. Beep boop.', from: 'bot' }]);
    }, 500);
  };

  // Check if the HOST_NAME matches the expected value
  const HOST_NAME = window.location.hostname;
  const expectedHostName = 'localhost'; // Change this to your actual expected hostname

  const isInvalidHost = HOST_NAME !== expectedHostName;

  if (isInvalidHost) {
    return (
      <div className="chat-widget p-4 border rounded-lg shadow-lg w-80">
        <div className="error-message font-bold text-center text-red-500">
          Error 404: Chat Widget cannot be embedded on this site.
        </div>
      </div>
    );
  }

  return (
    <div className="chat-widget p-4 border rounded-lg shadow-lg w-80">
      <div className="chat-header font-bold text-center border-b pb-2">Chat Widget</div>
      <div className="chat-messages max-h-48 overflow-y-auto p-2 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message p-2 rounded-lg ${
              message.from === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chat-input flex mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputTextChange}
          className="flex-grow p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
