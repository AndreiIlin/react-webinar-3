import Head from '../head/index.jsx';
import Controls from '../controls/index.jsx';
import List from '../list/index.jsx';
import React from 'react';
import PropTypes from 'prop-types';

function Shop({
  cart,
  openCart,
  list,
  addItemToCart,
}) {
  return (
    <>
      <Head title="Магазин" />
      <Controls cart={cart} openCart={openCart} />
      <List
        list={list}
        addItemToCart={addItemToCart}
      />
    </>
  );
}
Shop.propTypes = {
  list: PropTypes.array,
  cart: PropTypes.array,
  openCart: PropTypes.func,
  addItemToCart: PropTypes.func,
};
export default React.memo(Shop);
