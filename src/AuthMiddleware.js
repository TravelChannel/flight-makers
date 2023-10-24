import React, {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = ({ children, state }) => {
  const navigate = useNavigate();
  console.log('State:', state);
  if (!state || !state.hasOwnProperty('searchDataArr')) {
    console.error('Data not available!');
    navigate('/');
    return null;
  }
  return <Fragment>{children}</Fragment>;
};

export default AuthMiddleware;
