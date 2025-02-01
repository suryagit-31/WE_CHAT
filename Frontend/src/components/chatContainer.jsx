import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatstore";
import Chatheader from "./chatheader";
import Messageinput from "./messageinput";
import Messageskeleton from "./skeletons/messageskeleton";
import { useAuthStore } from "../store/useAuthStore";
import { format_Time } from "../libs/util";

const chatContainer = () => {
  const { selectedUser, messages, getMessages, ismessagesloading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id]);

  if (ismessagesloading)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <Chatheader />
        <Messageskeleton />
        <Messageinput />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Chatheader />
      <div className="flex-1 overflow-y-auto p-4 space-x-4 space-y-1">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profile_pic
                      : selectedUser.profile_pic
                  }
                  alt="Profile Picture"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {format_Time(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col mb-2">
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <Messageinput />
    </div>
  );
};

export default chatContainer;
