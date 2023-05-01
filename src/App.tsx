import { useEffect, useState } from 'react';
import './App.scss';
import ToDoList, { TaskType } from './components/ToDoList/ToDoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

type ToDoListTypes = {
  id: string,
  title: string,
  filter: FilterValuesType,
}

const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'Mercedes-Benz', isDone: false },
    { id: v1(), title: 'AUDI', isDone: true },
    { id: v1(), title: 'BMW', isDone: true },
    { id: v1(), title: 'Tesla', isDone: false },
    { id: v1(), title: 'Rolls-Royce', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  const changeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find((task) => task.id === id);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  };

  let tasksForTodoList = tasks;

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }

  let TODOLISTS: Array<ToDoListTypes> = [
    { id: v1(), title: 'Cars', filter: 'all' },
    { id: v1(), title: 'Watches', filter: 'active' },
  ];

  return (
    <div className="App">
      {TODOLISTS.map((eachToDo) => (
        <ToDoList
          filter={eachToDo.filter}
          title={eachToDo.title}
          tasks={tasksForTodoList}
          removeTask={removeTask}
          addTask={addTask}
          changeFilter={changeFilter}
          changeTaskStatus={changeStatus}
        />
      ))}
      <button
        id="theme-button"
        onClick={() => document.body.classList.toggle('_dark')}
      >
        Theme
      </button>
    </div>
  );
};

export default App;
