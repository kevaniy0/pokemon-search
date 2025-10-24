import './index.scss';
import type { ButtonProps } from '../../types/props';

const Button = (props: ButtonProps) => {
  const classes = props.className.join(' ') ?? [];
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {props.name}
      {props.element ? props.element : ''}
    </button>
  );
};

export default Button;
