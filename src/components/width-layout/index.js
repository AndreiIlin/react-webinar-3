import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function WidthLayout({
  children,
  width,
}) {
  const cn = bem('WidthLayout');
  return (
    <div className={cn({width})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  );
}

WidthLayout.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf(['small', 'medium', 'large']),
}

WidthLayout.defaultProps = {};

export default memo(WidthLayout)
