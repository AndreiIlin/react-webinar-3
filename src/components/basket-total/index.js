import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { useTranslation } from '../../hooks/use-translation.js';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const translate = useTranslation('basket');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
