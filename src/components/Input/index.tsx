import React from 'react';
import './index.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  return <input {...props}></input>;
};

export default Input;
