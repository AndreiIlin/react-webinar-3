import Head from '../head/index.jsx';
import List from '../list/index.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils.js';
import './style.css';

function Cart({
  cart,
  closeCart,
  removeItemFromCart,
}) {
  return (
    <div className={'Cart'}>
      <Head title={'Корзина'}>
        <button onClick={closeCart}>Закрыть</button>
      </Head>
      <div className={'Cart-body'}>
        <List
          isCartList
          cart={cart}
          removeItemFromCart={removeItemFromCart}
        />
        {cart.length ? (
          <div className={'Cart-results'}>
            <p className={'Cart-results-text'}>Итого</p>
            <p className={'Cart-results-text'}>{numberFormat(cart.reduce((a, b) => a + (b.sum), 0))}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
Cart.propTypes = {
  cart: PropTypes.array,
  closeCart: PropTypes.func,
  removeItemFromCart: PropTypes.func,
};
export default React.memo(Cart);
