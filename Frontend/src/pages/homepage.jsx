import React from "react";
import { useChatStore } from "../store/useChatstore";
import Nochatcontanier from "../components/nochatcontanier";
import ChatContainer from "../components/chatContainer";
import Sidebar from "../components/sidebar";

const Homepage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <Nochatcontanier /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
