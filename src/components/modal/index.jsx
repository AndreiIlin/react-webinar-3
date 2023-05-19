import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({
  isModalOpened,
  closeModal,
  children,
}) {
  return (
    <div className={isModalOpened ? 'Modal Modal_opened' : 'Modal'} onClick={closeModal}>
      <div className={'Modal-content'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
Modal.propTypes = {
  isModalOpened: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.node,
};
Modal.defaultProps = {
  isModalOpened: false,
  closeModal: () => {
  },
};
export default Modal;
