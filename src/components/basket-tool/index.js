import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { useTranslation } from '../../hooks/use-translation.js';

function BasketTool({
  sum,
  amount,
  onOpen,
  children,
}) {
  const cn = bem('BasketTool');
  const translate = useTranslation('basket');
  return (
    <div className={cn()}>
      {children}
      <div className={cn('body')}>
        <span className={cn('label')}>{translate.inBasket}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate.tool)} / ${numberFormat(sum)} ₽`
          : `${translate.empty}`
        }
      </span>
        <button onClick={onOpen}>{translate.goTo}</button>
      </div>
    </div>
  );
}
BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  children: PropTypes.node,
};
BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0,
};
export default memo(BasketTool);
