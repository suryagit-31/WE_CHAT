import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatstore";
import { useAuthStore } from "../store/useAuthStore";
import default_profile from "../assets/default_profile.jpg";

const Chatheader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profile_pic || default_profile}
                alt={selectedUser.Username.charAt(0).toUpperCase()}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">
              {selectedUser.Fullname.charAt(0).toUpperCase() +
                selectedUser.Fullname.slice(1)}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default Chatheader;
