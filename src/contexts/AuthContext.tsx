import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  vehicles: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addVehicle: (vehicleId: string) => void;
  removeVehicle: (vehicleId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<string[]>([]);

  const login = async (email: string, _password: string) => {
    // This is a mock login - replace with actual API call
    // For demo purposes, any email/password will work
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email: email,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    setVehicles([]);
  };

  const addVehicle = (vehicleId: string) => {
    setVehicles(prev => [...prev, vehicleId]);
  };

  const removeVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v !== vehicleId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        vehicles,
        login,
        logout,
        addVehicle,
        removeVehicle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
