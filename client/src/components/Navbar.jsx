import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 flex justify-between items-center py-4 px-6 sm:px-20 xl:px-32 transition-all duration-300">

      <img
        src={assets.logo}
        alt="Logo"
        className="w-36 sm:w-44 cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={() => navigate("/")}
      />

      {user ? (
        <div className="scale-110">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn()}
          className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-gradient-to-r from-violet-600 to-purple-500 text-white px-8 py-3 shadow-lg shadow-violet-600/20 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;