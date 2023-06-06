import { ChangeEvent } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FilterValuesType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import './ToDoList.scss';

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
  addItem: (title: string, toDoListID: string) => void;
  changeFilter: (value: FilterValuesType, eachToDoID: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, toDoListID: string) => void;
  removeToDoList: (id: string) => void;
  changeTaskName: (toDoListID: string, id: string, value: string) => void;
};

const ToDoList = (props: PropsType) => {
  const allFilter = () => props.changeFilter('all', props.id);
  const activeFilter = () => props.changeFilter('active', props.id);
  const completedFilter = () => props.changeFilter('completed', props.id);
  const removeToDoList = () => {
    props.removeToDoList(props.id);
  };
  const addTask = (title: string) => {
    props.addItem(title, props.id);
  };

  return (
    <div className="ToDoList">
      <button onClick={removeToDoList} id="remove-to-do">
        X
      </button>
      <h3>{props.title}</h3>
      <AddItemForm inputPlaceholder="Task name..." addItem={addTask} />
      <ul className="ToDoList__list">
        <TransitionGroup>
          {props.tasks.length !== 0 &&
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
                <CSSTransition key={t.id} timeout={350} classNames={'taskItem'}>
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
            })}
        </TransitionGroup>
        {props.tasks.length === 0 && <h4>There are no tasks!</h4>}
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
