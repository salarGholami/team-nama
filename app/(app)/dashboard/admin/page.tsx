// app/(app)/dashboard/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "@/services/user.service";
import { User } from "@/types/user";
import Link from "next/link";
import { getRoles } from "@/services/role.service";

interface Role {
  id: string;
  title: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [usersData, rolesData] = await Promise.all([
        getAllUsers(),
        getRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getRoleName = (roleId?: string) => {
    return roles.find((r) => r.id === roleId)?.title || roleId || "-";
  };

  if (isLoading) {
    return <div className="p-6 text-center">درحال بارگذاری...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">مدیریت کاربران</h1>
        <Link
          href="/dashboard/admin/add-user"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + افزودن کاربر جدید
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            تعداد کل کاربران
          </div>
          <div className="text-3xl font-bold mt-2">{users.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            تعداد رول‌ها
          </div>
          <div className="text-3xl font-bold mt-2">{roles.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            کاربران فعال
          </div>
          <div className="text-3xl font-bold mt-2">{users.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            آخرین بروزرسانی
          </div>
          <div className="text-sm font-bold mt-2">امروز</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                نام
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                ایمیل
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                رول
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                شماره تماس
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                بخش
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    {getRoleName(user.roleId)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.phone || "-"}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.department || "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/admin/edit-user/${user.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      ویرایش
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">حذف کاربر</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              آیا مطمئن هستید که می‌خواهید کاربر{" "}
              <strong>{selectedUser.name}</strong> را حذف کنید؟
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                انصراف
              </button>
              <button
                onClick={() => handleDelete(selectedUser.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
