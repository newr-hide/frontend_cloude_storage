import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(()=> {return checkAuthentication()});
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
  }
  const logout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
const checkAuthentication = () => {
  const user = localStorage.getItem('user_login')
  return user !== null
}
export const useAuth = () => useContext(AuthContext)