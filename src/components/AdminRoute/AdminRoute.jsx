import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // 'admin' hoặc 'user'
  // tạo const role lấy user.role
  const role = user ? JSON.parse(user).role : null;
  // Giả sử bạn lưu thông tin vai trò trong localStorage
  //   if (!token) return <Navigate to="/login" replace />;
  //   if (role !== "admin") return <Navigate to="/dashboard" replace />;
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default AdminRoute;
