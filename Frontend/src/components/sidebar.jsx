import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatstore";
import { useAuthStore } from "../store/useAuthStore";
import Sidebarskeleton from "./skeletons/sidebarskeleton";
import { Users } from "lucide-react";
import default_profile from "../assets/default_profile.jpg";

const Sidebar = () => {
  const {
    getChatusers,
    Chatusers,
    selectedUser,
    setSelectedUser,
    isusersloading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getChatusers();
  }, [getChatusers]);

  if (isusersloading) return <Sidebarskeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/** <SearchBar /> */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {Chatusers.map((user) => (
          <button
            key={user._id}
            className={` w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors 
          ${selectedUser?._id === user._id ? "bg-base-200" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profile_pic || default_profile}
                className="object-cover size-12 rounded-full"
                alt={user.Username}
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3  bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate">{user.Username}</div>
              <div className="text-zinc-500 text-sm">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
