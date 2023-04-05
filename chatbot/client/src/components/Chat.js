import React from "react";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../Chat.css";
import ChatGPTLogo from "../Images/chatGpt.png";
import UserLogo from "../Images/user.png";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import Navbar from "./Navbar";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT",
      sender: "ChatGPT",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; //all the old messages + new message

    //update our message state
    setMessages(newMessages);

    //set a typing indicator first
    setTyping(true);
    //process message to chatGPT (Send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages) => {
    //chatMessages {sender:"user" or "ChatGPT",message:"The message content here"}
    //apiMessages {role:"user" or assistant,content:"the message content here"}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    //role:"user" -> a message from the user,"assistant" -> a respinse from chatGPT
    //"system" -> generally one intial message defining HOW we want chatGPT to talk

    const systemMessage = {
      role: "system",
      content: "Explain all concepts", //Speak like a pirate,Explain like I am a 10 years of experience Software Engineer.
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1,message2,message3
      ],
    };

    const result = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      apiRequestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API}`,
        },
      }
    );
    setMessages([
      ...chatMessages,
      {
        message: result.data.choices[0].message.content,
        sender: "ChatGPT",
      },
    ]);
    setTyping(false);
  };
  return (
    <div className="contain">
      <Navbar />
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="ChatGPT is typing..." /> : null
            }
          >
            {messages.map((message, i) => {
              return (
                <Message style={{ textAlign: "left" }} key={i} model={message}>
                  {message.sender === "ChatGPT" ? (
                    <Avatar src={ChatGPTLogo} name="ChatGPT" />
                  ) : (
                    <Avatar src={UserLogo} name="user" />
                  )}
                </Message>
              );
            })}
          </MessageList>
          <MessageInput
            style={{ textAlign: "left" }}
            placeholder="Type message here"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
