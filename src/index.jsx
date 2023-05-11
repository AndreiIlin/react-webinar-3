import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Store from './store.js';
import { App } from './components/app';
import { list } from './list.js';

const store = new Store({ list });
const root = createRoot(document.getElementById('root'));
store.subscribe(() => {
  root.render(<App store={store} />);
});
// Первый рендер приложения
root.render(<App store={store} />);
