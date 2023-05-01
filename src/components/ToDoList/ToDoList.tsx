import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import './ToDoList.scss';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;

  removeTask: (id: string) => void;
  addTask: (title: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
};

const ToDoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
    setError(null);
  };

  const onEnterKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && newTaskTitle.trim() !== '') {
      onAddButtonClickHandler();
    }
  };

  const onAddButtonClickHandler = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required!');
    } else {
      props.addTask(newTaskTitle.trim());
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
          // className='error'
          value={newTaskTitle}
          onChange={onInputChangeHandler}
          onKeyUp={onEnterKeyUpHandler}
          type="text"
          placeholder="Type..."
        />
        <button onClick={onAddButtonClickHandler}>+</button>
      </div>
      {error && <h4 className="error-message">{error}</h4>}
      {/* <div className="error-message">Title is required!</div> */}
      <ul className="ToDoList__list">
        {props.tasks.length ? (
          props.tasks.map((task) => {
            const removeTaskHandler = () => {
              props.removeTask(task.id);
            };

            const isDoneChangeHandler = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeTaskStatus(task.id, event.currentTarget.checked);
            };

            return (
              <li className={task.isDone ? '_isDone' : ''} key={task.id}>
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
        <button
          className={props.filter === 'all' ? '_active' : ''}
          onClick={allFilter}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? '_active' : ''}
          onClick={activeFilter}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? '_active' : ''}
          onClick={completedFilter}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
