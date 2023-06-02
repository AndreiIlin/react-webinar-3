import { memo } from 'react';
import useTranslate from '../../hooks/use-translate.js';
import { useAuth } from '../../hooks/use-auth.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthorizationBarLayout from '../../components/authorization-bar-layout/index.js';

function AuthorizationBar() {
  const { t } = useTranslate();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const callbacks = {
    logout: () => auth.logout(),
    goToLoginPage: () => navigate('/login', {
      state: location.pathname,
    }),
  };

  return (
    <AuthorizationBarLayout>
      {auth.userData && auth.userData.user && (<Link to={'/profile'}><span>{auth.userData.user.username}</span></Link>)}
      {auth.isLoggedIn ? (
        <button onClick={callbacks.logout}>{t('logout')}</button>
      ) : (
        <button onClick={callbacks.goToLoginPage}>{t('login')}</button>
      )}
    </AuthorizationBarLayout>
  );
}
export default memo(AuthorizationBar);
