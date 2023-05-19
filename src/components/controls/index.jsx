import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat, plural } from '../../utils.js';

function Controls({
  cart,
  openCart,
}) {
  return (
    <div className="Controls">
      <p className={'Controls-title'}>В корзине:</p>
      <p className={'Controls-count'}>{cart.length ? `${cart.length} ${plural(cart.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${numberFormat(cart.reduce((a, b) => a + (b.count * b.price), 0))}` : 'пусто'}</p>
      <button className={'Controls-btn'} onClick={openCart}>Перейти</button>
    </div>
  );
}
Controls.propTypes = {
  onOpenCart: PropTypes.func,
};
Controls.defaultProps = {
  openCart: () => {
  },
};
export default React.memo(Controls);
