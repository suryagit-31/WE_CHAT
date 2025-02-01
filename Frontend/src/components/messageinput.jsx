import React from "react";
import { useChatStore } from "../store/useChatstore";
import { useState, useEffect, useRef } from "react";
import { Image, Send, X } from "lucide-react";
import { toast } from "react-hot-toast";
const Messageinput = () => {
  const { messages, getMessages } = useChatStore();
  const [text, setText] = useState("");
  const [privewimage, setPrivewimage] = useState(null);
  const { sendNewMessage } = useChatStore();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (!image.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64data = reader.result;
      setPrivewimage(base64data);
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !privewimage) {
      return;
    }
    try {
      await sendNewMessage({
        text: text.trim(),
        image: privewimage,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    //clear the input form
    setText("");
    setPrivewimage(null);
    fileInputRef.current.value = null;
  };

  const removeImage = () => {
    setPrivewimage(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="p-4 w-full">
      {" "}
      {privewimage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={privewimage}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage}>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`sm:flex btn btn-circle
                     ${privewimage ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!text.trim() && !privewimage}
          >
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messageinput;
