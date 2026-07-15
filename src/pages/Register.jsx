import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { registerUser } from "../Services/authService.js";

function Register() {
  // State
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await registerUser({
        email,
        username,
        password,
      });

      localStorage.setItem("token", JSON.stringify(response));

      window.location.href = "/";
    } catch (err) {
      console.log("===== REGISTER ERROR =====");
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.log("Message:", err.message);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Đăng ký thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#4f46e5] to-[#22d3ee] p-4">
      <div className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-2xl sm:p-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          {/* Email */}
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

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-5 py-4 text-sm text-slate-900 outline-none transition-colors focus:border-[#5B4BFF] focus:ring-1 focus:ring-[#5B4BFF]"
            />
          </div>

          {/* Password */}
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

          {/* Hiển thị lỗi */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-[#5B4BFF] py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Chuyển sang trang Đăng nhập */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#5B4BFF] hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
