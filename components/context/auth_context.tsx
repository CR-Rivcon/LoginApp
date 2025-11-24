import { clearSessionFromStorage, loadSessionFromStorage, saveSessionToStorage } from '@/utils/storage';
import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
}
type Cred = { id: string; name: string; password: string };

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const ExpectedUsers: Cred[] = [
  { id: '1', name: 'root', password: 'root' },
  { id: '2', name: 'admin', password: 'admin' },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    loadSessionFromStorage()
    .then((loadedUser) => {
      if (loadedUser) {
        setUser(loadedUser);
      }
    });
  }, []);


  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);



  const login = (username: string, password: string) => {
    const foundUser = ExpectedUsers.find(u => u.name === username && u.password === password);
    if (!foundUser) {
      throw new Error('Credenciales inválidas');
    }
    setUser({ id: foundUser.id, name: foundUser.name });
    saveSessionToStorage({ id: foundUser.id, name: foundUser.name });
  };

  const logout = () => {
    setUser(null);
    clearSessionFromStorage();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}