import React, { createContext, ReactNode, useContext, useState } from 'react';

type User = { id: string; name: string };
type Cred = { id: string; name: string; password: string };

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const ExpectedUsers: Cred[] = [
  { id: '1', name: 'cris', password: '1234' },
  { id: '2', name: 'root', password: 'root' },
  { id: '3', name: 'admin', password: 'admin' },
  { id: '4', name: 'cris@ipss.cl', password: '1234' },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const foundUser = ExpectedUsers.find(u => u.name === username && u.password === password);
    if (!foundUser) {
      throw new Error('Credenciales inválidas');
    }
    setUser({ id: foundUser.id, name: foundUser.name });
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}