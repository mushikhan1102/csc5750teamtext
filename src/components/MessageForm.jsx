import React from "react";
import Attach from "../components/images/attach";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
     
      {
        <label htmlFor="img">
          <Attach />
        
        </label>
      }

        <input
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
        />

      <div>
        
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
    
      </div>
    
      <div>
        <button className="btn">Send</button>
      </div>
    
    </form>
  );
};

export default MessageForm;