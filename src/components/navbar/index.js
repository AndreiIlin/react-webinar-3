import { NavLink } from 'react-router-dom';
import { routes } from '../../routes.js';
import { memo } from 'react';
import { useTranslation } from '../../hooks/use-translation.js';
import './style.css';

function Navbar() {
  const translate = useTranslation('navigation');
  return (
    <div className={'Navbar'}>
      <NavLink to={routes.mainPage()}>{translate.main}</NavLink>
    </div>
  );
}
export default memo(Navbar);
