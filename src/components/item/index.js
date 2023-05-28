import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/use-translation.js';

function Item(props) {
  const cn = bem('Item');
  const translate = useTranslation('item');
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <NavLink to={props.linkToItemPage} className={cn('title')}>
        {props.item.title}
      </NavLink>
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
  linkToItemPage: PropTypes.string,
};
Item.defaultProps = {
  onAdd: () => {
  },
};
export default memo(Item);
