import React, { useState } from "react";

const Test = () => {
  const [inputText, setInputText] = useState("");
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = () => {
    const formattedText = inputText
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("<br>");

    console.log(formattedText);
  };

  return (
    <div>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows="4"
        cols="50"
      />
      <button onClick={handleSubmit}>Gửi</button>
    </div>
  );
};

export default Test;
