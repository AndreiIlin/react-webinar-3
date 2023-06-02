import PropTypes from 'prop-types';
import { memo } from 'react';
import { useAuth } from '../../hooks/use-auth.js';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const auth = useAuth();

  return auth.isLoggedIn ? (
    <>
      {children}
    </>
  ) : <Navigate to={'/login'} replace />;
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default memo(PrivateRoute);
