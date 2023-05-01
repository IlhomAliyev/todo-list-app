import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;

  removeTask: (id: string) => void;
  addTask: (title: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
};

const ToDoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onEnterKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && newTaskTitle !== '') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    } else if (event.code === 'Enter' && newTaskTitle === '') {
      alert('The name of the task is not entered!');
    }
  };

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const onAddButtonClickHandler = () => {
    if (newTaskTitle === '') {
      alert('The name of the task is not entered!');
    } else {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const allFilter = () => props.changeFilter('all');
  const activeFilter = () => props.changeFilter('active');
  const completedFilter = () => props.changeFilter('completed');

  return (
    <div className="ToDoList">
      <h3>{props.title}</h3>
      <div className="input-wrapper">
        <input
          value={newTaskTitle}
          onChange={onInputChangeHandler}
          onKeyUp={onEnterKeyUpHandler}
          type="text"
          placeholder="Type..."
        />
        <button onClick={onAddButtonClickHandler}>+</button>
      </div>
      <ul className="ToDoList__list">
        {props.tasks.length ? (
          props.tasks.map((task) => {
            const removeTaskHandler = () => {
              props.removeTask(task.id);
            };

            const isDoneChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(task.id, event.currentTarget.checked);
            };

            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={isDoneChangeHandler}
                />
                <span>{task.title}</span>
                <button id="delete-btn" onClick={removeTaskHandler}>
                  X
                </button>
              </li>
            );
          })
        ) : (
          <h4>There are no tasks!</h4>
        )}
      </ul>
      <div className="buttons-wrapper">
        <button onClick={allFilter}>All</button>
        <button onClick={activeFilter}>Active</button>
        <button onClick={completedFilter}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
