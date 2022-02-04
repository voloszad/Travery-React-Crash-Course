import { MouseEventHandler } from "react";

interface Iprops {
  color?: string;
  text: string;
  onClick: MouseEventHandler
}

const Button = ({ color = 'steelblue', text = 'button', onClick }: Iprops) => {
  return (
    <button onClick={onClick} className='btn' style={{ backgroundColor: color }}>{text}</button>
  );
};

export default Button;
