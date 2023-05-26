import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { routes } from '../../routes.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/use-translation.js';

function Item(props) {
  const navigate = useNavigate();
  const cn = bem('Item');
  const translate = useTranslation('item');
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    navigateToGoodPage: () => navigate(routes.goodById(props.item._id)),
  };
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.navigateToGoodPage}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate.action}</button>
      </div>
    </div>
  );
}
Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};
Item.defaultProps = {
  onAdd: () => {
  },
};
export default memo(Item);
