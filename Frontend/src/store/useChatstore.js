import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../libs/axios";

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
      toast.error(error.response?.data?.message || error.message);
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
      toast.error(error.response?.data?.message || error.message);
    } 
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
