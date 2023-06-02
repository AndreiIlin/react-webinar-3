import { createContext, useCallback, useMemo, useState } from 'react';
import { login, logout } from './authActions.js';

const LOCALSTORAGE_KEY = 'ylab'; //TODO По хорошему, наверное, лучше вынести в env
/**
 * @type {React.Context<{}>}
 */
export const AuthContext = createContext({});
/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */

export function AuthProvider({ children }) {
  const storageData = window.localStorage.getItem(LOCALSTORAGE_KEY);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!storageData);
  const [userData, setUserData] = useState(() => JSON.parse(storageData) ?? {});
  const auth = useMemo(() => ({
    isLoggedIn,
    userData,
    login: (authData) => login(authData, setUserData, window.localStorage, LOCALSTORAGE_KEY, setIsLoggedIn),
    logout: () => logout(setUserData, window.localStorage, LOCALSTORAGE_KEY, userData.token, setIsLoggedIn),
  }), [isLoggedIn, userData]);
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

