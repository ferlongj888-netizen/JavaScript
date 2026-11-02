import { create } from "zustand";
import {type UserLoginResponse, type CreateUser, type User, type UserLoginRequest,} from "../types/user";
import { api } from "../api/ax";
import { AxiosError } from "axios";

export interface RegisterResult {
  success: boolean;
  error: string | null;
}

export interface LoginResult {
  success: boolean;
  error: string | null;
}

interface AuthState {
  user: User | null;
  error: string | null;

  register: (data: CreateUser) => Promise<RegisterResult>;
  login: (data: UserLoginRequest) => Promise<LoginResult>;
  getAccessToken: () => string | null;
  setAccessToken: (token: string | null) => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  error: null,

  register: async (data: CreateUser) => {
    try {
      await api.post("auth/register", data);
      return { success: true, error: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        const resp_code = error.response?.status;
        if (resp_code == 422) {
          let errors: string[] = error.response?.data.detail.map(
            (entry: {msg: string}) => entry.msg,
          );
          return { success: false, error: errors.join("\n") };
        } else if (resp_code == 400) {
          return { success: false, error: "Такой пользователь уже существует" };
        }
        return { success: false, error: "Ошибка при выполнении запроса" };
      } else {
        return { success: false, error: "Ошибка при выполнении запроса" };
      }
    }
  },
  login: async (data: UserLoginRequest) => {
    try {
      const resp = await api.post<UserLoginResponse>("/auth/login", data);
      get().setAccessToken(resp.data.access_token);
      return { success: true, error: ""};
    } catch (err) {
      return { success: false, error: "Не удалось войти" };
    }
  },
  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },
  setAccessToken: (token) => {
    if (token == null) {
      localStorage.removeItem("access_token");
    } else {
      localStorage.setItem("access_token", token);
    }
  },
  loadUser: async () => {},
  logout: async () => {},
}));