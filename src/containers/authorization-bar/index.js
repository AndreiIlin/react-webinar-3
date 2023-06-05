import { memo } from 'react';
import useTranslate from '../../hooks/use-translate.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthorizationBarLayout from '../../components/authorization-bar-layout/index.js';
import useStore from '../../hooks/use-store.js';
import useSelector from '../../hooks/use-selector.js';

function AuthorizationBar() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const select = useSelector(state => ({
    userData: state.auth.userData,
    isLoggedIn: state.auth.isLoggedIn,
  }));
  const callbacks = {
    logout: () => store.actions.auth.logout(),
    goToLoginPage: () => navigate('/login', {
      state: location.pathname,
    }),
  };

  return (
    <AuthorizationBarLayout>
      {select.userData && select.userData.user && (
        <Link to={'/profile'}><span>{select.userData.user.username}</span></Link>)}
      {select.isLoggedIn ? (
        <button onClick={callbacks.logout}>{t('logout')}</button>
      ) : (
        <button onClick={callbacks.goToLoginPage}>{t('login')}</button>
      )}
    </AuthorizationBarLayout>
  );
}
export default memo(AuthorizationBar);
