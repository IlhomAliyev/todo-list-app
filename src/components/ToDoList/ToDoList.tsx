import { Reorder } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
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
  changeToDoListName: (toDoListID: string, value: string) => void;
};

const ToDoList = (props: PropsType) => {
  const [tasks, setTasks] = useState(props.tasks);

  const allFilter = () => props.changeFilter('all', props.id);
  const activeFilter = () => props.changeFilter('active', props.id);
  const completedFilter = () => props.changeFilter('completed', props.id);
  const removeToDoList = () => {
    props.removeToDoList(props.id);
  };
  const addTask = (title: string) => {
    props.addItem(title, props.id);
  };

  const changeToDoListNameHandler = (value: string) => {
    props.changeToDoListName(props.id, value);
  };

  return (
    <div className="ToDoList">
      <button onClick={removeToDoList} id="remove-to-do">
        X
      </button>
      <EditableSpan
        elemClassName="todoListName"
        title={props.title}
        onChangeHandler={changeToDoListNameHandler}
      />
      <AddItemForm inputPlaceholder="Task name..." addItem={addTask} />

      <Reorder.Group
        className="ToDoList__list"
        axis="y"
        values={tasks}
        onReorder={setTasks}
      >
        {/* <ul className="ToDoList__list"> */}
        {tasks.length !== 0 &&
          tasks.map((t) => {
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
            const taskTitleChange = (newTitle: string) => {
              props.changeTaskName(props.id, t.id, newTitle);
            };

            return (
              <Reorder.Item
                key={t.id}
                className={t.isDone ? 'taskItem _isDone' : 'taskItem'}
                value={t}
                whileDrag={{
                  //! PAUSE 11:30 08.06.2023
                  transform: 'scale(1.1)',
                  // transform: 'rotate(-5deg)',
                  // transformOrigin: '0% 0%',
                }}
              >
                {/* <li> */}
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={isDoneChangeHandler}
                />
                <EditableSpan
                  elemClassName="taskTitle"
                  title={t.title}
                  onChangeHandler={taskTitleChange}
                />
                <button id="delete-btn" onClick={removeTaskHandler}>
                  X
                </button>
                {/* </li> */}
              </Reorder.Item>
            );
          })}
        {tasks.length === 0 && <h4>There are no tasks!</h4>}
        {/* </ul> */}
      </Reorder.Group>
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
