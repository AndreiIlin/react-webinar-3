import { memo } from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/use-translation.js';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const translate = useTranslation('basket');
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: () => props.closeModal(),
  };
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <NavLink
        to={props.linkToItemPage}
        className={cn('title')}
        onClick={callbacks.closeModal}
      >{props.item.title}</NavLink>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate.count}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate.delete}</button>
        </div>
      </div>
    </div>
  );
}
ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  linkToItemPage: PropTypes.string,
};
ItemBasket.defaultProps = {
  onRemove: () => {
  },
};
export default memo(ItemBasket);
