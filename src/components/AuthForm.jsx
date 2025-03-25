import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRegister(params.get("mode") === "register");
  }, [location]);

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (newUser) => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();

    if (isRegister) {
      if (users.some((user) => user.email === email)) {
        setError("User already exists. Please sign in.");
        setSuccess("");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setSuccess("");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setSuccess("");
        return;
      }

      const newUser = { username, email, password };
      saveUser(newUser);

      setSuccess("Account successfully created! Please sign in.");
      setError("");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        setSuccess("Successfully logged in!");
        setError("");

        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);

        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        setError("Invalid credentials or not registered. Please sign up first.");
        setSuccess("");
      }
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const googleUser = {
      username: decoded.name,
      email: decoded.email,
      googleId: decoded.sub,
    };

    localStorage.setItem("username", googleUser.username);
    localStorage.setItem("email", googleUser.email);

    setSuccess(`Welcome, ${googleUser.username}!`);
    setError("");

    setTimeout(() => {
      navigate("/products");
    }, 1000);
  };

  const handleGoogleLoginError = () => {
    setError("Google sign-in failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
              placeholder="Enter your username"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
              placeholder="Confirm your password"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 transition">
          {isRegister ? "Sign Up" : "Sign In"}
        </Button>

        <div className="text-center my-4 text-gray-500">OR</div>

        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
      </form>
    </GoogleOAuthProvider>
  );
};

export default AuthForm;
