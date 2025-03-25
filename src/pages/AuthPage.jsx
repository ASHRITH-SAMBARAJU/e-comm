
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "signin";

  const handleToggleMode = () => {
    navigate(`/auth?mode=${mode === "signin" ? "register" : "signin"}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cream to-brown flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-brown-800">
          {mode === "signin" ? "Sign In" : "Register"}
        </h1>

        <AuthForm />

        <div className="text-center mt-4">
          <button
            onClick={handleToggleMode}
            className="text-blue-500 hover:underline"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
