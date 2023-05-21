import Item from '../item/index.jsx';
import { numberFormat } from '../../utils.js';
import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function CartItem({
  item,
  removeItemFromCart,
}) {
  return (
    <Item item={item} onClick={() => removeItemFromCart(item.code)} actionTitle={'Удалить'}>
      {<>
        <div className={'Cart-item-info'}>{numberFormat(item.price)}</div>
        <div className={'Cart-item-info'}>{item.count} шт</div>
      </>}
    </Item>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number,
    count: PropTypes.number,
  }),
  removeItemFromCart: PropTypes.func,
};
export default React.memo(CartItem);
