import { Outlet } from 'react-router-dom';
import { memo } from 'react';

function MainLayout() {
  return (
    <Outlet />
  );
}
export default memo(MainLayout);
