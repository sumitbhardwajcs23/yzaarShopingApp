'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Address, AdminRole, AdminUser, User } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface AuthContextType {
  // Customer Auth
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Admin Auth
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, role?: AdminRole) => boolean;
  adminLogout: () => void;
}

const DEFAULT_CUSTOMER: User = {
  id: 'usr_patron_01',
  name: 'Aryaman Birla',
  email: 'aryaman@yzaaarpatron.com',
  phone: '+91 98200 45678',
  addresses: [
    {
      id: 'addr_default_1',
      name: 'Aryaman Birla',
      street: 'Tower 2, The Imperial Towers, Tardeo',
      apartment: 'Apt 4201',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400034',
      phone: '+91 98200 45678',
      isDefault: true,
    },
    {
      id: 'addr_default_2',
      name: 'Aryaman Birla (Atelier Office)',
      street: 'Maker Maxity, Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      phone: '+91 98200 45678',
      isDefault: false,
    },
  ],
  createdAt: '2026-06-01T10:00:00Z',
};

const DEFAULT_ADMIN: AdminUser = {
  id: 'admin_root_1',
  name: 'Atelier Director',
  email: 'director@yzaaar.com',
  role: 'super_admin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('yzaaar_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Set sample logged-in patron for seamless instant preview
        setUser(DEFAULT_CUSTOMER);
        localStorage.setItem('yzaaar_user', JSON.stringify(DEFAULT_CUSTOMER));
      }

      const savedAdmin = localStorage.getItem('yzaaar_admin');
      if (savedAdmin) {
        setAdminUser(JSON.parse(savedAdmin));
      } else {
        // Default root admin
        setAdminUser(DEFAULT_ADMIN);
        localStorage.setItem('yzaaar_admin', JSON.stringify(DEFAULT_ADMIN));
      }
    } catch (e) {
      console.error('Failed to parse auth cache:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: generateId('usr'),
      name: name || email.split('@')[0],
      email,
      addresses: DEFAULT_CUSTOMER.addresses,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('yzaaar_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yzaaar_user');
  };

  const updateProfile = (name: string, phone: string) => {
    if (!user) return;
    const updated = { ...user, name, phone };
    setUser(updated);
    localStorage.setItem('yzaaar_user', JSON.stringify(updated));
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...addressData,
      id: generateId('addr'),
    };

    let updatedAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    const updated = { ...user, addresses: updatedAddresses };
    setUser(updated);
    localStorage.setItem('yzaaar_user', JSON.stringify(updated));
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id),
    };
    setUser(updated);
    localStorage.setItem('yzaaar_user', JSON.stringify(updated));
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    const updated = { ...user, addresses: updatedAddresses };
    setUser(updated);
    localStorage.setItem('yzaaar_user', JSON.stringify(updated));
  };

  // Admin Auth
  const adminLogin = (email: string, role: AdminRole = 'super_admin') => {
    const admin: AdminUser = {
      id: generateId('adm'),
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
    };
    setAdminUser(admin);
    localStorage.setItem('yzaaar_admin', JSON.stringify(admin));
    return true;
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('yzaaar_admin');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        login,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        adminUser,
        isAdminLoggedIn: Boolean(adminUser),
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
