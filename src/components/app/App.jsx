import React from 'react';
import { Item } from '../item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
export const App = ({ store }) => {
  const list = store.getState().list;
  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">{
          list.map(item => <Item key={item.code} store={store} item={item} />,
          )}
        </div>
      </div>
    </div>
  );
};
