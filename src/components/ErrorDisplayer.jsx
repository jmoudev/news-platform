import React from 'react';

const ErrorDisplayer = ({ msg }) => {
  return <h2>{msg ? msg : 'Sorry, page not found'}</h2>;
};

export default ErrorDisplayer;
