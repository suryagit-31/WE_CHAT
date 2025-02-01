import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Loginpage from "./pages/login";
import Signup from "./pages/signup";
import Profilepage from "./pages/profile_page";
import Settingspage from "./pages/settings";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { UseThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth_validity, ischeckingAuth } = useAuthStore();
  const {theme} = UseThemeStore();

  useEffect(() => {
    checkAuth_validity();
  }, [checkAuth_validity]);

 // console.log({ authUser });

  if (ischeckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-12" />
      </div>
    );
  }
  return (
    <div data-theme={theme} className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Loginpage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profilepage /> : <Navigate to="/login" />}
          />
          <Route path="/settings" element={<Settingspage />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default App;
