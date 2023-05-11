import React from 'react';

/**
 * Пункт списка
 * @param store {Store} Хранилище состояния приложения
 * @param item Данные пункта списка
 * @returns {React.ReactElement}
 */
export const Item = ({
  store,
  item,
}) => {
  return (
    <div className="List-item">
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => store.selectItem(item.code)}
      >
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">{item.title}{item.selectCount ? ` | Выделяли ${item.selectCount} раз` : ''}</div>
        <div className="Item-actions">
          <button onClick={() => store.deleteItem(item.code)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
