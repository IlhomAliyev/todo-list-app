import { useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ToDoList from './components/ToDoList/ToDoList';
import {
  ToDoListTypes,
  allToDoListDefault,
  tasksObjectDefault,
} from './data/tasks';
import darkBg from './img/dark.jpg';
import lightBg from './img/light.jpg';
import './styles/App.scss';

export type FilterValuesType = 'all' | 'completed' | 'active';

const App = () => {
  let [bgImg, setBgImage] = useState(lightBg);
  const themeSwitch = () => {
    const appDiv = document.querySelector('.App');
    appDiv?.classList.toggle('_dark');

    appDiv?.classList.contains('_dark') ? (bgImg = darkBg) : (bgImg = lightBg);
    setBgImage(bgImg);
  };

  //todo нужно оптимизировать (при вводе обновляется весь объект tasksObj)
  const changeTaskName = (toDoListID: string, id: string, value: string) => {
    let task = tasksObj[toDoListID].find((t) => t.id === id);
    if (task) {
      task.title = value;
      setTasksObj({ ...tasksObj }); //todo
    }
  };

  const [allToDoLists, setAllToDoLists] =
    useState<Array<ToDoListTypes>>(allToDoListDefault);
  const [tasksObj, setTasksObj] = useState(tasksObjectDefault);

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
    let updatedToDoLists = [newToDoList, ...allToDoLists];

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
          <div className="grid-container">
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
      <img id="background" src={bgImg} alt="Background Image" />
    </div>
  );
};

export default App;
