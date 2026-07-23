import { useMemo, useState, useEffect } from "react";
import {
  Search,
  Trash2,
  KeyRound,
  EllipsisVertical,
  X,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

function Badge({ children, tone = "default" }) {
  const toneClass =
    tone === "muted"
      ? "bg-slate-100 text-slate-600 ring-slate-200"
      : tone === "success"
        ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
        : tone === "warning"
          ? "bg-amber-100 text-amber-700 ring-amber-200"
          : "bg-sky-100 text-sky-700 ring-sky-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${toneClass}`}
    >
      {children}
    </span>
  );
}

function UserManagement() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://api-blog-af3u.onrender.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        //bóc tách dữ liệu từ response ra và in lên console.log("Response from API:", response);
        const data = await response.json();
        console.log("Response from API:", data);

        if (!response.ok) throw new Error("Không thể tải danh sách");

        const usersArray = data.items || data; // Nếu API trả về mảng trực tiếp, sử dụng data; nếu trả về object có trường items, sử dụng data.items
        setUsers(usersArray);
      } catch (error) {
        console.error("Lỗi fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    const keyword = query.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter((user) => {
      return (
        user.username?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword) ||
        user.role?.toLowerCase().includes(keyword) ||
        (user.status && user.status.toLowerCase().includes(keyword))
      );
    });
  }, [query, users]);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteError("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    setDeleteError("");
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    const userId = selectedUser?.id || selectedUser?._id;

    if (!token) {
      setDeleteError("Bạn chưa đăng nhập.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteError("");

      const response = await fetch(
        `https://api-blog-af3u.onrender.com/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Xóa người dùng thất bại");
      }

      setUsers((prev) =>
        prev.filter((u) => u.id !== userId && u._id !== userId),
      );
      toast.success("User deleted successfully");
      closeDeleteModal();
    } catch (error) {
      setDeleteError(error.message || "Không thể xóa user.");
    } finally {
      setIsDeleting(false);
    }
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = async () => {
    const token = localStorage.getItem("token");
    const userId = selectedUser?.id || selectedUser?._id;

    try {
      setIsUpdatingRole(true);

      const response = await fetch(
        `https://api-blog-af3u.onrender.com/api/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: selectedRole }),
        },
      );

      if (!response.ok) {
        throw new Error("Cập nhật quyền thất bại");
      }

      setUsers(
        users.map((u) =>
          u.id === userId || u._id === userId
            ? { ...u, role: selectedRole }
            : u,
        ),
      );

      toast.success("Role updated successfully");
      setIsRoleModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Không thể cập nhật quyền.");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-50"></div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_55%,_#eef2ff_100%)]">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/70 px-5 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md sm:px-8 flex items-center justify-center">
          <h1 className="flex items-center gap-4 text-4xl sm:text-5xl font-bold text-[#5B4BFF]">
            <span className="text-4xl sm:text-5xl">🧩</span> User Management
          </h1>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Users List
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tìm kiếm nhanh theo username, email, role.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-[420px]">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search users..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                <EllipsisVertical size={18} />
                Filters
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 lg:table">
              <thead>
                <tr className="text-left">
                  <th className="border-b border-slate-200 px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Username
                  </th>
                  <th className="border-b border-slate-200 px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Email
                  </th>
                  <th className="border-b border-slate-200 px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Role
                  </th>
                  <th className="border-b border-slate-200 px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user) => (
                  <tr
                    key={user.id || user._id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="border-b border-slate-100 px-4 py-5 text-sm font-semibold text-slate-900">
                      {user.username}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-5 text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-5">
                      <Badge tone={user.role === "admin" ? "warning" : "muted"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openDeleteModal(user)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm transition hover:bg-rose-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openRoleModal(user)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm transition hover:bg-indigo-100"
                        >
                          <KeyRound size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!filteredUsers || filteredUsers.length === 0) && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
                Không tìm thấy user phù hợp với từ khóa hiện tại.
              </div>
            )}
          </div>
        </section>
      </main>

      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-[2px]">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900">
                Change User Role
              </h3>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Select the new role for {selectedUser?.username}.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Select Role
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Shield size={18} className="text-slate-400" />
                </div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-[#5B4BFF] focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                disabled={isUpdatingRole}
                className="rounded-xl bg-[#5B4BFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 shadow-sm disabled:opacity-60"
              >
                {isUpdatingRole ? "Saving..." : "Save Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-[2px]">
          <div className="relative w-full max-w-[500px] rounded-2xl bg-white px-6 py-6 shadow-[0_30px_90px_rgba(15,23,42,0.25)] sm:px-8 sm:py-8">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={isDeleting}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="pr-8">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Delete this user?
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-500">
                This user account will be permanently removed.
              </p>
            </div>

            {deleteError && (
              <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {deleteError}
              </p>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-rose-600 px-6 text-base font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
