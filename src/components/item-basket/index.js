import { memo } from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes.js';

function ItemBasket(props) {
  const navigate = useNavigate();
  const cn = bem('ItemBasket');
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    navigateToGoodPage: () => {
      props.closeModal();
      navigate(routes.goodById(props.item._id));
    },
  };
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.navigateToGoodPage}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
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
};
ItemBasket.defaultProps = {
  onRemove: () => {
  },
};
export default memo(ItemBasket);
