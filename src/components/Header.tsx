import Button from "./Button";
import { MouseEventHandler } from "react";

interface Iprops {
  title: string;
  onAdd: MouseEventHandler;
  showAddTask: boolean;
}

const Header = ({ title = 'Title', onAdd, showAddTask }: Iprops) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={onAdd} />
    </header>
  );
};

export default Header;
