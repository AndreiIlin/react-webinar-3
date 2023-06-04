import PropTypes from 'prop-types';
import { memo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector.js';

function PrivateRoute({ children }) {
  const select = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
  }));

  const location = useLocation();

  return select.isLoggedIn ? (
    <>
      {children}
    </>
  ) : <Navigate to={'/login'} state={location.pathname} />;
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default memo(PrivateRoute);
