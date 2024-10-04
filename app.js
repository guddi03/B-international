import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cannedMessages, setCannedMessages] = useState([
    { text: 'Hello, how can I help you?' },
    { text: 'Thank you for your message. We will get back to you soon.' }
  ]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/messages', { text: newMessage, customerName: 'John Doe' })
      .then(response => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.toLowerCase();
    const filteredMessages = messages.filter((message) => message.text.toLowerCase().includes(query));
    setMessages(filteredMessages);
  };

  const handleCannedMessage = (message) => {
    setNewMessage(message.text);
  };

  return (
    <div>
      <h1>Agent Portal</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <h2>Canned Messages</h2>
      <ul>
        {cannedMessages.map((message, index) => (
          <li key={index}>
            <button onClick={() => handleCannedMessage(message)}>{message.text}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;