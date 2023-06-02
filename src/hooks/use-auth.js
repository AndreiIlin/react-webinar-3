import { useContext } from 'react';
import { AuthContext } from '../auth/context.js';

/**
 * Хук возвращает функцию для входа и выхода с сайта, состояние авторизации пользователя и данные пользователя
 */
export function useAuth() {
  return useContext(AuthContext);
}
