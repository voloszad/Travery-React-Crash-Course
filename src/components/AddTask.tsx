import { FormEvent, useState } from "react";
import { ITask } from "../App";

interface IProps {
  onAdd: (task: ITask) => void
}

const AddTask = ({ onAdd }: IProps) => {

  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Add task text');
      return;
    }

    onAdd({ text, day, reminder });
    setText('');
    setDay('');
    setReminder(false);
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type='text' value={text} placeholder='Add task' onChange={((e) => setText(e.target.value))} />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input type='text' value={day} placeholder='Add Date & Time' onChange={((e) => setDay(e.target.value))} />
      </div>
      <div className="form-control form-control-check">
        <label>Reminder</label>
        <input type='checkbox' checked={reminder} onChange={((e) => setReminder(e.currentTarget.checked))} />
      </div>
      <input className='btn btn-block' type='submit' value='Save Task' />
    </form>
  );
};

export default AddTask;
