import { useEffect, useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ToDoList, { TaskType } from './components/ToDoList/ToDoList';
import {
  ToDoListTypes,
  allToDoListDefault,
  tasksObjectDefault,
} from './data/tasks';
import './styles/App.scss';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const themeSwitch = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    darkMode
      ? (document.body.className = '_dark')
      : (document.body.className = '');
  }, [darkMode]);

  const [allToDoLists, setAllToDoLists] = useState<Array<ToDoListTypes>>(allToDoListDefault);
  const [tasksObj, setTasksObj] = useState<TasksStateType>(tasksObjectDefault);

  //todo ye;yj jgnbvbpbhjdfnm (ghb ddjlt j,yjdkztncz dtcm j,]trn ефылыЩио)
  const changeTaskName = (toDoListID: string, id: string, value: string) => {
    let task = tasksObj[toDoListID].find((t) => t.id === id);
    if (task) {
      task.title = value;
      setTasksObj({ ...tasksObj }); //todo
    }
  };

  const changeToDoListName = (toDoListID: string, value: string) => {
    let exactToDoList = allToDoLists.find((tdl) => tdl.id === toDoListID);
    if (exactToDoList) {
      exactToDoList.title = value;
      setAllToDoLists([...allToDoLists]);
    }
  };

  const removeToDoList = (toDoListID: string) => {
    let filteredAllToDoLists = allToDoLists.filter(
      (tdl) => tdl.id !== toDoListID
    );
    setAllToDoLists(filteredAllToDoLists);

    delete tasksObj[toDoListID];
    setTasksObj({ ...tasksObj });
  };

  const addToDoList = (title: string) => {
    let newToDoList: ToDoListTypes = { id: v1(), title: title, filter: 'all' };
    let updatedToDoLists: ToDoListTypes[] = [newToDoList, ...allToDoLists];

    let newTasksObj = { [newToDoList.id]: [], ...tasksObj };

    setTasksObj(newTasksObj);
    setAllToDoLists(updatedToDoLists);
  };

  const removeTask = (id: string, toDoListID: string) => {
    let tasks = tasksObj[toDoListID];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[toDoListID] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  const addItem = (title: string, toDoListID: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[toDoListID];
    let newTasks = [newTask, ...tasks];
    tasksObj[toDoListID] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesType, id: string) => {
    let exactToDoList = allToDoLists.find((tdl) => tdl.id === id);
    if (exactToDoList) {
      exactToDoList.filter = value;
    }
    setAllToDoLists([...allToDoLists]);
  };

  const changeStatus = (id: string, isDone: boolean, toDoListID: string) => {
    let tasks = tasksObj[toDoListID];
    let task = tasks.find((task) => task.id === id);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  };

  return (
    <div className="App">
      <AddItemForm
        inputPlaceholder="Name of the task list"
        addItem={addToDoList}
      />
      <div className="container">
        <div className="shadow-elements"></div>
        {allToDoLists.length ? (
          <div className="tasks-wrapper">
            {allToDoLists.map((tdl) => {
              let tasksForTodoList = tasksObj[tdl.id];

              if (tdl.filter === 'completed') {
                tasksForTodoList = tasksForTodoList.filter(
                  (task) => task.isDone === true
                );
              }

              if (tdl.filter === 'active') {
                tasksForTodoList = tasksForTodoList.filter(
                  (task) => task.isDone === false
                );
              }

              return (
                <ToDoList
                  key={tdl.id}
                  id={tdl.id}
                  filter={tdl.filter}
                  title={tdl.title}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  addItem={addItem}
                  changeFilter={changeFilter}
                  changeTaskStatus={changeStatus}
                  removeToDoList={removeToDoList}
                  changeTaskName={changeTaskName}
                  changeToDoListName={changeToDoListName}
                />
              );
            })}
          </div>
        ) : (
          <h1 id="noTasksMessage">There are no task lists!</h1>
        )}
      </div>

      <button id="theme-button" onClick={themeSwitch}>
        Theme
      </button>
    </div>
  );
};

export default App;
