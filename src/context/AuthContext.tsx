import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const navigate = useNavigate();
  const login = useCallback(
    (newToken: string) => {
      setToken(newToken);
      localStorage.setItem("token", newToken);
      navigate("/", { replace: true });
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (!token) return;
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime: number = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    };

    checkTokenExpiry();
  }, [token, logout]);

  const authContextValue = useMemo(
    () => ({ token, login, logout }),
    [token, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
