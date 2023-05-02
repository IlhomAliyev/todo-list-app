import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import './ToDoList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createJsxClosingElement } from 'typescript';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;

  removeTask: (id: string, toDoListID: string) => void;
  addTask: (title: string, toDoListID: string) => void;
  changeFilter: (value: FilterValuesType, eachToDoID: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, toDoListID: string) => void;
  removeToDoList: (id: string) => void;
  changeTaskName: (toDoListID: string, id: string, value: string) => void;
};

const ToDoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
    setError(null);
  };

  const onEnterKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onAddButtonClickHandler();
    }
  };

  const onAddButtonClickHandler = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required!');
    } else {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle('');
    }
  };

  const allFilter = () => props.changeFilter('all', props.id);
  const activeFilter = () => props.changeFilter('active', props.id);
  const completedFilter = () => props.changeFilter('completed', props.id);

  const removeToDoList = () => {
    props.removeToDoList(props.id);
  };

  return (
    <div className="ToDoList">
      <button onClick={removeToDoList} id="remove-to-do">
        X
      </button>
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
      {error && <h4 className="error-message">{error}</h4>}
      <ul className="ToDoList__list">
        <TransitionGroup>
          {props.tasks.length ? (
            props.tasks.map((t) => {
              const removeTaskHandler = () => {
                props.removeTask(t.id, props.id);
              };

              const isDoneChangeHandler = (
                event: ChangeEvent<HTMLInputElement>
              ) => {
                props.changeTaskStatus(
                  t.id,
                  event.currentTarget.checked,
                  props.id
                );
              };

              const taskTitleChange = (
                event: ChangeEvent<HTMLInputElement>
              ) => {
                props.changeTaskName(props.id, t.id, event.currentTarget.value);
              };

              const liClassName: string[] = ['taskItem'];

              return (
                <CSSTransition key={t.id} timeout={500} classNames={'taskItem'}>
                  <li
                    className={
                      t.isDone
                        ? [...liClassName, '_isDone'].join(' ')
                        : liClassName.join('')
                    }
                  >
                    <input
                      type="checkbox"
                      checked={t.isDone}
                      onChange={isDoneChangeHandler}
                    />
                    <input
                      className="taskTitle"
                      type="text"
                      value={t.title}
                      onChange={taskTitleChange}
                    />
                    <button id="delete-btn" onClick={removeTaskHandler}>
                      X
                    </button>
                  </li>
                </CSSTransition>
              );
            })
          ) : (
            <h4>There are no tasks!</h4>
          )}
        </TransitionGroup>
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
