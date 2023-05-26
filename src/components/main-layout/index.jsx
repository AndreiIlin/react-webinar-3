import useSelector from '../../store/use-selector.js';
import Basket from '../../app/basket/index.js';
import { Outlet } from 'react-router-dom';
import { memo } from 'react';

function MainLayout() {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}
export default memo(MainLayout);
