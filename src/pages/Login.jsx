import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getMe, loginUser } from "../Services/authService.js";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      const token = response.accessToken;

      if (!token) {
        throw new Error("Không tìm thấy token trong phản hồi đăng nhập");
      }

      const meResponse = await getMe(token);
      const user = meResponse?.user;

      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Sai email hoặc mật khẩu",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#4f46e5] to-[#22d3ee] p-4">
      <div className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-5 py-4 text-sm text-slate-900 outline-none transition-colors focus:border-[#5B4BFF] focus:ring-1 focus:ring-[#5B4BFF]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-5 py-4 text-sm text-slate-900 outline-none transition-colors focus:border-[#5B4BFF] focus:ring-1 focus:ring-[#5B4BFF]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-[#5B4BFF] py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#5B4BFF] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
