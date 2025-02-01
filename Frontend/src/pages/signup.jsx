import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCircle,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import Imagepattren from "../components/imagepattren";
import toast from "react-hot-toast";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setformdata] = useState({
    Username: "",
    Fullname: "",
    email: "",
    password: "",
  });

  const { Signup, is_signingup } = useAuthStore();

  const validateForm = () => {
    if (!formdata.Fullname.trim()) {
      return toast.error("full name is Required");
    }
    if (!formdata.Username.trim()) {
      return toast.error("username is Required");
    }
    if (!formdata.password.trim()) {
      return toast.error("password field is empty");
    }  
    if (!formdata.email.trim()) {
      return toast.error("E-mail is required");
    }
    if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      return toast.error("Invalid email format");
    }
    if (formdata.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;

    //if(!)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      Signup(formdata);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">
                Create{" "}
                <span className="font-extrabold text-3xl text-purple-500 border border-gray-400 px-1 py-0.5 rounded bg-gray-300 ">
                  We Chat
                </span>{" "}
                Account
              </h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="user_WC"
                  value={formdata.Username}
                  onChange={(e) =>
                    setformdata({ ...formdata, Username: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formdata.email}
                  onChange={(e) =>
                    setformdata({ ...formdata, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="sesha surya dammalapa"
                  value={formdata.Fullname}
                  onChange={(e) =>
                    setformdata({ ...formdata, Fullname: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formdata.password}
                  onChange={(e) =>
                    setformdata({ ...formdata, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={is_signingup}
            >
              {is_signingup ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/*right side */}

      <Imagepattren
        title="join our community"
        subtitle="connect with friends ,Share moments and stay updated "
      />
    </div>
  );
};

export default Signup;
