import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item/index.jsx';
import './style.css';
import { numberFormat } from '../../utils.js';
import CartItem from '../cartItem/index.jsx';

function List({
  isCartList,
  cart,
  list,
  removeItemFromCart,
  addItemToCart,
}) {
  return (
    <div className={'List'}>{
      isCartList ?
        cart.length ? cart.map(item =>
          (<div key={item.code} className="List-item">
              <CartItem removeItemFromCart={removeItemFromCart} item={item} />
            </div>
          ),
        ) : (<p className={'List_empty'}>В корзине пока еще нет товаров</p>)
        : list.map(item =>
          <div key={item.code} className="List-item">
            <Item item={item} actionTitle={'Добавить'} onClick={() => addItemToCart(item)}>
              {numberFormat(item.price)}
            </Item>
          </div>,
        )}
    </div>
  );
}
List.propTypes = {
  isCartList: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
  })),
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    count: PropTypes.number,
  })),
  removeItemFromCart: PropTypes.func,
  addItemToCart: PropTypes.func,
};
List.defaultProps = {
  isCartList: false,
  removeItemFromCart: () => {
  },
  addItemToCart: () => {
  },
};
export default React.memo(List);
