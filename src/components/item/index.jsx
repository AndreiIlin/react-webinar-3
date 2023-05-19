import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
      </div>
      <div className={'Item-info'}>
        {props.children}
      </div>
      <div className="Item-actions">
        <button onClick={props.onClick}>
          {props.actionTitle}
        </button>
      </div>
    </div>
  );
}
Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  actionTitle: PropTypes.string,
  onClick: PropTypes.func,
};
export default React.memo(Item);
