import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const capitalizeFullName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" ");
};

const Base_backendUrl = "http://localhost:4000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  is_signingup: false,
  is_loggingin: false,
  is_updatingprofile: false,
  ischeckingAuth: true,
  socket: null,

  onlineUsers: [],

  checkAuth_validity: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connect_socket();
    } catch (error) {
      set({ authUser: null });
      // console.log("error in checking AUTH ", error);
    } finally {
      set({ ischeckingAuth: false });
    }
  },

  Signup: async (data) => {
    set({ is_signingup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      //console.log("Signup successful, user data:", res.data);
      const fullname = capitalizeFullName(res.data.Fullname);
      toast.success(`Welcome to WE CHAT ${fullname}`);
      get.connect_socket();
      //console.log(res.data.createdAt);
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      //console.log("error in signup ",error.response?.data?.message || error.message );
    } finally {
      set({ is_signingup: false });
    }
  },

  Login: async (data) => {
    set({ is_loggingin: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      const fullname = capitalizeFullName(res.data.Fullname);

      // console.log("Login successful, user data:", res.data);
      toast.success(`welcome  back ${fullname}`);
      get().connect_socket();
      //console.log(res.data.createdAt);
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      //console.log( "error in login ", error.response?.data?.message || error.message );
    } finally {
      set({ is_loggingin: false });
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("user logged out successfully");
      get().disconnect_socket();
    } catch (error) {
      console.log(
        "error in logout ",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  },

  UpdateProfile: async (data) => {
    set({ is_updatingprofile: true });
    try {
      //console.log(data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      //console.log("Profile updated successfully, user data:", res.data);
      set({ authUser: res.data });
      toast.success("Profile pic updated successfully");
      return res.data;
    } catch (error) {
      // console.log("we have an error in updating profile", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ is_updatingprofile: false });
    }
  },

  connect_socket: () => {
    const { authUser } = get();
    if (!authUser) {
      console.log("Socket failed user authenticationr");
      return;
    }
    if (get().socket?.connected) {
      console.log("Socket already connected or no user");
      return;
    }
    const socket = io(Base_backendUrl, {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to server with socket ID:", socket.id);
    });
  },

  disconnect_socket: () => {},
}));
