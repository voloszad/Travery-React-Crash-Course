import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

export interface ITask {
  id?: number,
  text: string;
  day: string;
  reminder: boolean;
}

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const apiUrl = 'http://localhost:5000/tasks'

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(apiUrl);
    return await res.json();
  }

  // Fetch task
  const fetchTask = async (id: number) => {
    const res = await fetch(`${apiUrl}/${id}`);
    return await res.json();
  }

  // Add task
  const addTask = async (task: ITask) => {
    /*    const id = Math.floor(Math.random() * 1000 + 1);
        const newTask = {id, ...task};
        setTasks([...tasks, newTask])*/

    const res = await fetch(`${apiUrl}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data])
  }

  // Delete task
  const deleteTask = async (id: number) => {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder = async (id: number) => {
    const taskToToggle = await fetchTask(id);

    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    await fetch(`${apiUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updateTask)
    });

    setTasks(tasks.map((task) =>
      task.id === id
        ? { ...task, reminder: !task.reminder }
        : task
    ))

  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);


  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        <main>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {
                    tasks.length > 0
                      ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                      : <p>No tasks</p>
                  }
                </>
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='/task/:id' element={<TaskDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
