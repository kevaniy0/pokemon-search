import React from 'react';
import './index.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

class Input extends React.Component<InputProps> {
  render(): React.ReactNode {
    return <input placeholder="type a pokemon name" {...this.props}></input>;
  }
}

export default Input;
