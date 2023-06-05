import useStore from '../../hooks/use-store.js';
import { memo, useCallback, useLayoutEffect, useMemo } from 'react';
import useSelector from '../../hooks/use-selector.js';
import { formatCategories } from '../../utils.js';
import Select from '../../components/select/index.js';

function CategoriesFilter() {
  const store = useStore();
  useLayoutEffect(() => {
    store.actions.categories.loadCategories();
  }, []);
  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.categories.storeCategories,
  }));
  const callbacks = {
    // Выбор категории
    onCategorySort: useCallback(category => {
      store.actions.categories.changeCategory(category);
      store.actions.catalog.setParams({
        category,
        page: 1,
      });
    }, [store]),
  };
  const options = {
    categories: useMemo(() => ([
      {
        value: '',
        title: 'Все',
      },
      ...formatCategories(select.categories),
    ]), [select.categories]),
  };
  return (
    <Select options={options.categories} value={select.category} onChange={callbacks.onCategorySort} />
  );
}
export default memo(CategoriesFilter);
