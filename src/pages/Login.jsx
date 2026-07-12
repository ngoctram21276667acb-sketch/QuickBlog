import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#4f46e5] to-[#22d3ee] p-4">
      {/* Thẻ Form màu trắng */}
      <div className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-2xl sm:p-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Các ô nhập liệu */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-slate-200 px-5 py-4 text-sm text-slate-900 outline-none transition-colors focus:border-[#5B4BFF] focus:ring-1 focus:ring-[#5B4BFF]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-md border border-slate-200 px-5 py-4 text-sm text-slate-900 outline-none transition-colors focus:border-[#5B4BFF] focus:ring-1 focus:ring-[#5B4BFF]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#5B4BFF] py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {/* Chuyển sang trang Đăng ký */}
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
