import React from "react";
import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";

const allowedAdmins = ["kushdastane69211@gmail.com"];

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!allowedAdmins.includes(user.email)) {
        toast.error("You are not authorized to access the admin panel.");
        await auth.signOut();
        return;
      }

      toast.success("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-sm w-full text-center border">
        <div className="flex flex-col items-center space-y-4">
          <Lock size={42} className="text-green-700" />
          <h2 className="text-2xl font-semibold text-gray-800">Admin Access</h2>
          <p className="text-gray-500 text-sm">
            Please login with an authorized Google account to manage the
            website.
          </p>

          <button
            onClick={handleLogin}
            className="mt-4 w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition font-medium"
          >
            <span className="bg-white p-1 rounded-full opacity-75">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Icon"
                className="w-5 h-5"
              />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
