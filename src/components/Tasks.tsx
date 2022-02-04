import { ITask } from "../App";
import Task from "./Task";

interface IProps {
  tasks: ITask[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const Tasks = ({ tasks, onDelete, onToggle }: IProps) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
