import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:4000");
const userId = nanoid(3);
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sentChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userId });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  console.log(chat);
  console.log(userId);
  return (
    <div className="App">
      <h1>Chat app</h1>
      <form className="message_box" onSubmit={sentChat}>
        <div className="message">
          {chat.map((mess, index) => {
            return (
              <h4 key={index} className={userId === mess.userId ? "me" : "you"}>
                {mess.message}
              </h4>
            );
          })}
        </div>
        <div className="input_box">
          <input
            className="input_field"
            type="text"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn">Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
