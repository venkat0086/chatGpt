import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState("");

  const showResult = async () => {
    const models = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputValue }],
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API}`,
    };

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        models,
        {
          headers: headers,
        }
      );
      setChat(res.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-10 pl-60 flex gap-3">
      <TextField
        variant="standard"
        className="w-96"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => showResult()}
      >
        Click me
      </Button>

      <div>{chat}</div>
    </div>
  );
};

export default Chat;
