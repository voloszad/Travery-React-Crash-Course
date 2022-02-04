import { ITask } from "../App";
import { FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface IProps {
  task: ITask;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const Task = ({ task, onDelete, onToggle }: IProps) => {
  return (
    <div onDoubleClick={() => onToggle(task.id!)} className={`task ${task.reminder ? 'reminder' : ''}`}>
      <h3>
        {task.text}
        <FaTimes onClick={() => onDelete(task.id!)} style={{ color: 'red', cursor: 'pointer' }} />
      </h3>
      <p>{task.day}</p>
      <p>
        <Link to={`/task/${task.id}`}>View details</Link>
      </p>
    </div>
  );
};

export default Task;
