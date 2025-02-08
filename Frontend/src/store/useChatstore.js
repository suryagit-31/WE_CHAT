import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../libs/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  Chatusers: [],
  messages: [],
  selectedUser: null,
  isusersloading: false,
  ismessagesloading: false,

  getChatusers: async () => {
    set({ isusersloading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ Chatusers: res.data });
    } catch (error) {
      //toast.error(error.response?.data?.message || error.message);
      //console.log("error in fetching users", error);
    } finally {
      set({ isusersloading: false });
    }
  },

  getMessages: async (id) => {
    set({ ismessagesloading: true });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ ismessagesloading: false });
    }
  },

  sendNewMessage: async (messagedata) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messagedata
      );
      set({ messages: [...messages, res.data] });
      return res.data;
    } catch (error) {
      console.log("the main new message is error here ", error);
      toast.error(error.response?.data?.message || error.message);
    }
  },

  subscribetoMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    try {
      const socket = useAuthStore.getState().socket;

      if (!socket || !socket.connected) {
        throw new Error("Socket is not connected.");
        //return;
      }

      socket.on("newMessage", (newmessage) => {
        if (newmessage.senderId !== selectedUser._id) return;
        set({
          messages: [...get().messages, newmessage],
        });
      });
    } catch (error) {
      console.log("the main new message is error here ", error);
    }
  },
  unsubscribeTomessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) {
      console.error("Socket is not connected.");
      return;
    }
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser, messages: [] }),
}));
