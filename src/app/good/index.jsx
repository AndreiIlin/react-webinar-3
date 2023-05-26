import PageLayout from '../../components/page-layout/index.js';
import Head from '../../components/head/index.js';
import { memo, useCallback, useEffect } from 'react';
import BasketTool from '../../components/basket-tool/index.js';
import useSelector from '../../store/use-selector.js';
import useStore from '../../store/use-store.js';
import { useParams } from 'react-router-dom';
import GoodInfo from '../../components/good-info/index.jsx';

function Good() {
  const store = useStore();

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(good => store.actions.basket.addToBasketFromGoodPage(good), [store]),
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    goodInfo: state.good.goodInfo,
  }));

  const { goodId } = useParams();

  useEffect(() => {
    store.actions.good.load(goodId);
    return () => store.actions.good.clear();
  }, []);

  return (
    <PageLayout>
      <Head title={'Магазин'} />
      <BasketTool
        onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum}
      />
      {select.goodInfo ? (
        <GoodInfo goodInfo={select.goodInfo} onAdd={callbacks.addToBasket} />
      ) : null}
    </PageLayout>
  );
}
export default memo(Good);
