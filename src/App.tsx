import { useEffect, useState } from 'react';
import './App.scss';
import ToDoList, { TaskType } from './components/ToDoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML & CSS', isDone: false },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React JS', isDone: true },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
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
    let tasksCopy = [...tasks]
    setTasks(tasksCopy);
  };

  let tasksForTodoList = tasks;

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }

  return (
    <div className="App">
      <ToDoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        addTask={addTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeStatus}
      />
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
