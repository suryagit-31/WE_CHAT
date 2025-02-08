import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatstore";
import Chatheader from "./chatheader";
import Messageinput from "./messageinput";
import Messageskeleton from "./skeletons/messageskeleton";
import { useAuthStore } from "../store/useAuthStore";
import { format_Time } from "../libs/util";
import default_profile from "../assets/default_profile.jpg";
import { LoaderCircle } from "lucide-react";

const chatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    ismessagesloading,
    subscribetoMessages,
    unsubscribeTomessages,
  } = useChatStore();

  const messageendref = useRef(null);

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!selectedUser || !authUser) return;
    getMessages(selectedUser._id);
    subscribetoMessages();

    return () => unsubscribeTomessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribetoMessages,
    unsubscribeTomessages,
  ]);

  useEffect(() => {
    if (messageendref.current && messages && authUser) {
      messageendref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


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
              message.senderId === authUser?._id ? "chat-end " : "chat-start"
            }`}
            ref={messageendref}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profile_pic
                      : selectedUser.profile_pic || default_profile
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
