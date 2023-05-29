import PageLayout from '../../components/page-layout/index.js';
import Head from '../../components/head/index.js';
import { memo, useCallback, useEffect } from 'react';
import BasketTool from '../../components/basket-tool/index.js';
import useSelector from '../../store/use-selector.js';
import useStore from '../../store/use-store.js';
import { useParams } from 'react-router-dom';
import GoodInfo from '../../components/good-info/index.js';
import Navbar from '../../components/navbar/index.js';
import LanguageSelect from '../../components/language-select/index.js';
import LanguageSelectLayout from '../../components/language-select-layout/index.js';
import Basket from '../basket/index.js';

function Good() {
  const store = useStore();
  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(good => store.actions.basket.addToBasketFromGoodPage(good), [store]),
    changeLanguage: useCallback((locale) => store.actions.locales.changeLocale(locale), [store]),
  };
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    goodInfo: state.good.goodInfo,
    locales: state.locales.availableLocales,
    activeModal: state.modals.name,
  }));
  const { goodId } = useParams();
  useEffect(() => {
    store.actions.good.load(goodId);
    return () => store.actions.good.clear();
  }, []);
  return (
    <>
      <PageLayout>
        <Head title={select.goodInfo?.title}>
          <LanguageSelectLayout>
            <LanguageSelect changeLanguage={callbacks.changeLanguage} locales={select.locales} />
          </LanguageSelectLayout>
        </Head>
        <BasketTool
          onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum}
        >
          <Navbar />
        </BasketTool>
        {select.goodInfo ? (
          <GoodInfo goodInfo={select.goodInfo} onAdd={callbacks.addToBasket} />
        ) : null}
      </PageLayout>
      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}
export default memo(Good);
