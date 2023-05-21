import React, { useCallback } from 'react';
import PageLayout from './components/page-layout/index.jsx';
import Modal from './components/modal/index.jsx';
import Shop from './components/shop/index.jsx';
import Cart from './components/cart/index.jsx';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const {
    list,
    cart,
    isModalOpened,
  } = store.getState();
  const callbacks = {
    removeItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),
    addItemToCart: useCallback(item => {
      store.addItemToCart(item);
    }, [store]),
    openCart: useCallback(() => {
      store.openModal();
    }, [store]),
    closeCart: useCallback(() => {
      store.closeModal();
    }, [store]),
  };
  return (
    <>
      <PageLayout>
        <Shop addItemToCart={callbacks.addItemToCart} cart={cart} list={list} openCart={callbacks.openCart} />
      </PageLayout>
      <Modal isModalOpened={isModalOpened} closeModal={callbacks.closeCart}>
        <Cart removeItemFromCart={callbacks.removeItemFromCart} closeCart={callbacks.closeCart} cart={cart} />
      </Modal>
    </>
  );
}
export default App;
