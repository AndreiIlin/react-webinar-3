import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ErrorMessage({ message }) {
  return (
    <p className={'ErrorMessage'}>{message}</p>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default memo(ErrorMessage);
