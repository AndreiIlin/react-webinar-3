import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationLayout from '../../components/pagination-layout/index.jsx';
import Pagination from '../../components/pagination/index.jsx';

function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activePage: state.catalog.activePage,
    pagesCount: state.catalog.pagesCount,
  }));
  useEffect(() => {
    store.actions.catalog.load(select.activePage);
  }, [select.activePage]);
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeActivePage: useCallback((page) => store.actions.catalog.changeActivePage(page), [store]),
  };
  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />;
    }, [callbacks.addToBasket]),
  };
  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      {select.pagesCount && (
        <PaginationLayout>
          <Pagination activePage={select.activePage} pagesCount={select.pagesCount} changeActivePage={callbacks.changeActivePage} />
        </PaginationLayout>
      )}
    </PageLayout>
  );
}
export default memo(Main);
