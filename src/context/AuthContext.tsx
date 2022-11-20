import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
import { getUserDataFromToken } from '../utils/formatters';

type User = {
  username: string;
  balance: number;
};

type SigInData = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  signIn: (data: SigInData) => Promise<ResponseData>;
  logOut: () => void;
};

type AuthProviderProps = {
  children: React.ReactElement;
};

type ResponseData = {
  token: string;
  refreshToken: {
    id: string;
    expiresIn: number;
    userId: string;
  };
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  const handleSetUserData = (token: string) => {
    const userData = getUserDataFromToken(token);
    setUser(userData);
  };

  useEffect(() => {
    const { '@@ngcash-app.token': token } = parseCookies();

    if (token) {
      const data = JSON.parse(token);
      handleSetUserData(data.token);
    }
  }, []);

  async function signIn({
    username,
    password,
  }: SigInData): Promise<ResponseData> {
    const { data } = await api.post<ResponseData>('/login', {
      username,
      password,
    });

    setCookie(undefined, '@@ngcash-app.token', JSON.stringify(data), {
      maxAge: 60 * 60 * 24, // One day
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    handleSetUserData(data.token);

    return data;
  }

  async function logOut() {
    destroyCookie(undefined, '@@ngcash-app.token');
    router.replace('/');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, signIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
