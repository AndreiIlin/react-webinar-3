import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes.js';
import { useTranslation } from '../../hooks/use-translation.js';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const translate = useTranslation('basket');
  return (
    <div className={cn()}>
      <div className={cn('navigation')}>
        <NavLink to={routes.mainPage()}>{translate.main}</NavLink>
      </div>
      <div className={cn('body')}>
        <span className={cn('label')}>{translate.inBasket}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate.tool)} / ${numberFormat(sum)} ₽`
          : `${translate.empty}`
        }
      </span>
        <button onClick={onOpen}>{translate.goTo}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
