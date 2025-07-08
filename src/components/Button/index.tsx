import React from 'react';
import './index.scss';

type ButtonProps = {
  onClick?: () => void;
  name: string;
  className: string[];
  disabled?: boolean;
};

class Button extends React.Component<ButtonProps> {
  render() {
    const classes = this.props.className.join(' ');
    return (
      <button
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        className={classes}
      >
        {this.props.name}
      </button>
    );
  }
}
export default Button;
