import PropTypes from 'prop-types';
import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils.js';

function GoodInfo({
  goodInfo,
  onAdd,
}) {
  const cn = bem('GoodInfo');
  const callbacks = {
    onAdd: () => onAdd(goodInfo),
  };
  return (
    <div className={cn()}>
      <p className={cn('description')}>{goodInfo.description}</p>
      <p className={cn('description')}>Страна
        производитель: <b>{goodInfo.madeIn.title} ({goodInfo.madeIn.code})</b></p>
      <p className={cn('description')}>Категория: <b>{goodInfo.category.title}</b></p>
      <p className={cn('description')}>Год выпуска: <b>{goodInfo.edition}</b></p>
      <p className={cn('price')}>{`Цена: ${numberFormat(goodInfo.price)}  ₽`}</p>
      <div>
        <button onClick={callbacks.onAdd} className={cn('btn')}>Добавить</button>
      </div>
    </div>
  );
}
GoodInfo.propTypes = {
  goodInfo: PropTypes.object,
};
export default memo(GoodInfo);
