import { useAuthStore } from "../store/useAuthStore";
import { Settings, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { Logout, authUser } = useAuthStore();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            WE CHAT
          </Link>
        </div>
        <div className="flex-none space-x-4">
          <Link
            to={"/settings"}
            className={`
              btn btn-sm gap-2 transition-colors
              
              `}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          {authUser && (
            <>
              <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <Link
                to={"/login"}
                className={`btn btn-sm gap-2`}
                onClick={Logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </>
          )}
        </div> 
      </div>
    </>
  );
};

export default Navbar;
