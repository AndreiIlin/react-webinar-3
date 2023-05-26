import PropTypes from 'prop-types';
import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils.js';
import { useTranslation } from '../../hooks/use-translation.js';

function GoodInfo({
  goodInfo,
  onAdd,
}) {
  const cn = bem('GoodInfo');
  const translate = useTranslation('goodPage');
  const callbacks = {
    onAdd: () => onAdd(goodInfo),
  };
  return (
    <div className={cn()}>
      <p className={cn('description')}>{goodInfo.description}</p>
      <p className={cn('description')}>{translate.country}: <b>{goodInfo.madeIn.title} ({goodInfo.madeIn.code})</b></p>
      <p className={cn('description')}>{translate.category}: <b>{goodInfo.category.title}</b></p>
      <p className={cn('description')}>{translate.year}: <b>{goodInfo.edition}</b></p>
      <p className={cn('price')}>{`${translate.price}: ${numberFormat(goodInfo.price)}  ₽`}</p>
      <div>
        <button onClick={callbacks.onAdd} className={cn('btn')}>{translate.action}</button>
      </div>
    </div>
  );
}
GoodInfo.propTypes = {
  goodInfo: PropTypes.object,
};
export default memo(GoodInfo);
