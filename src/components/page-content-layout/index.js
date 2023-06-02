import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';

function PageContentLayout({
  children,
  title,
  Component,
  marginTop,
  ...props
}) {
  const cn = bem('PageContentLayout');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <Component className={cn('content', { marginTop })} {...props}>
        {children}
      </Component>
    </div>
  );
}
PageContentLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  component: PropTypes.element,
  marginTop: PropTypes.oneOf([
    'small', 'medium', 'large',
  ]),
};
PageContentLayout.defaultProps = {
  Component: 'div',
  marginTop: 'medium',
};
export default memo(PageContentLayout);
