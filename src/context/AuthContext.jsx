// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function createUserFromEmail(email) {
  const namePart = email.includes("@") ? email.split("@")[0] : email;
  const niceName =
    namePart.charAt(0).toUpperCase() +
    namePart.slice(1).replace(/[._]/g, " ");

  return {
    email,
    name: niceName,
    phone: "",
    defaultAddress: "",
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Sign in / Sign up stub
  // profileOverrides: register ekranından gelen isim / telefon / adres vs.
  const login = (email, profileOverrides = {}) => {
    setUser((prev) => {
      // Aynı email ile zaten hesap varsa → sadece override uygula
      if (prev && prev.email === email) {
        return { ...prev, ...profileOverrides };
      }
      // Yeni "demo user" yarat
      const base = createUserFromEmail(email);
      return { ...base, ...profileOverrides };
    });
  };

  const logout = () => setUser(null);

  const updateProfile = (partial) => {
    setUser((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateProfile,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
