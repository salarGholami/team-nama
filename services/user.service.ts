// services/user.service.ts
import { httpClient } from "./http/client";
import { User, UserFormData } from "@/types/user";

export async function getUser() {
  const res = await httpClient.get("/auth/me");
  return res.data;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await httpClient.get("/users");
    return res.data?.users || [];
  } catch (error) {
    // Fallback to mock data if API fails
    return getMockUsers();
  }
}

export async function getUserById(id: number | string): Promise<User | null> {
  try {
    const res = await httpClient.get(`/users?id=${id}`);
    return res.data?.user || null;
  } catch (error) {
    const users = getMockUsers();
    return users.find((u) => u.id == id) || null;
  }
}

export async function createUser(data: UserFormData): Promise<User> {
  try {
    const res = await httpClient.post("/users", data);
    return res.data?.user || data;
  } catch (error) {
    // Mock user creation
    const allUsers = getMockUsers();
    const newUser: User = {
      id:
        Math.max(
          ...allUsers.map((u) => (typeof u.id === "number" ? u.id : 0))
        ) + 1,
      ...data,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      joinDate: new Date().toISOString().split("T")[0],
    };
    return newUser;
  }
}

export async function updateUser(
  id: number | string,
  data: Partial<UserFormData>
): Promise<User> {
  try {
    const res = await httpClient.put(`/users?id=${id}`, data);
    return res.data?.user || (data as User);
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: number | string): Promise<boolean> {
  try {
    await httpClient.delete(`/users?id=${id}`);
    return true;
  } catch (error) {
    throw error;
  }
}

function getMockUsers(): User[] {
  return [
    {
      id: 1,
      name: "Salar",
      email: "salar@corp.com",
      roleId: "CEO",
      phone: "09121234567",
      department: "مدیریت",
      joinDate: "1400-01-01",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salar",
    },
    {
      id: 2,
      name: "Reza",
      email: "reza@corp.com",
      roleId: "ProjectManager",
      phone: "09127654321",
      department: "پروژه",
      joinDate: "1401-03-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reza",
    },
    {
      id: 3,
      name: "Ali",
      email: "ali@corp.com",
      roleId: "FrontendDeveloper",
      phone: "09131111111",
      department: "توسعه",
      joinDate: "1401-06-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
    },
    {
      id: 4,
      name: "Sara",
      email: "sara@corp.com",
      roleId: "UIDesigner",
      phone: "09132222222",
      department: "طراحی",
      joinDate: "1401-09-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    },
    {
      id: 5,
      name: "Nima",
      email: "nima@corp.com",
      roleId: "BackendDeveloper",
      phone: "09133333333",
      department: "توسعه",
      joinDate: "1402-01-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nima",
    },
    {
      id: 6,
      name: "Maryam",
      email: "maryam@corp.com",
      roleId: "QAEngineer",
      phone: "09134444444",
      department: "تست",
      joinDate: "1402-02-14",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
    },
    {
      id: 7,
      name: "Omid",
      email: "omid@client.com",
      roleId: "Client",
      phone: "09135555555",
      department: "کلاینت",
      joinDate: "1402-03-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omid",
    },
    {
      id: 8,
      name: "فاطمه احمدی",
      email: "fateme.ahmadi@corp.com",
      roleId: "HRManager",
      phone: "09136666666",
      department: "منابع انسانی",
      joinDate: "1401-04-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fateme",
    },
    {
      id: 9,
      name: "محمد علی سلیمانی",
      email: "m.soleimani@corp.com",
      roleId: "CTO",
      phone: "09137777777",
      department: "فناوری",
      joinDate: "1400-06-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad",
    },
    {
      id: 10,
      name: "لیلا قاسمی",
      email: "leila.ghasemi@corp.com",
      roleId: "ProductManager",
      phone: "09138888888",
      department: "محصول",
      joinDate: "1401-07-22",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila",
    },
  ];
}
