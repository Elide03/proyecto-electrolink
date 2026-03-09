// src/utils/session.ts

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("usuario") !== null;
};

export const login = (usuario: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("usuario", usuario);
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("usuario");
  }
};
