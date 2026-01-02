// app/(app)/settings/profile/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { updateUser } from "@/services/user.service";
import { getRoles } from "@/services/role.service";
import { User } from "@/types/user";

interface Role {
  id: string;
  title: string;
}

export default function ProfileSettings() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        department: user.department || "",
      });
    }
    getRoles().then(setRoles);
  }, [user]);

  const getRoleName = (roleId?: string) => {
    return roles.find((r) => r.id === roleId)?.title || roleId || "-";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSave = async () => {
    if (!validateForm() || !user) {
      return;
    }

    setSaving(true);
    try {
      await updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
      } as any);
      setIsEditing(false);
      alert("پروفایل با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("خطا در بروزرسانی پروفایل");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-700 dark:text-gray-300">لطفا ابتدا وارد شوید</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">پروفایل من</h1>
        <p className="text-gray-600 dark:text-gray-400">
          اطلاعات شخصی و تنظیمات حساب خود را مدیریت کنید
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Avatar and Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {getRoleName(user.roleId)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  عضو از {user.joinDate || "مدت نامشخص"}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ویرایش
              </button>
            )}
          </div>
        </div>

        {/* Editable Profile Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h3 className="text-xl font-bold mb-6">اطلاعات شخصی</h3>

          {isEditing ? (
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  نام
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  ایمیل
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  شماره تماس
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  بخش
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
                >
                  {saving ? "درحال ذخیره..." : "ذخیره تغییرات"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name || "",
                      email: user.email || "",
                      phone: user.phone || "",
                      department: user.department || "",
                    });
                  }}
                  className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition font-medium"
                >
                  انصراف
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  نام
                </label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  ایمیل
                </label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  شماره تماس
                </label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.phone || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  بخش
                </label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.department || "-"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h3 className="text-xl font-bold mb-6">اطلاعات اضافی</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                رول
              </label>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {getRoleName(user.roleId)}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                تاریخ ملحق شدن
              </label>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {user.joinDate || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
