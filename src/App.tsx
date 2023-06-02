import { useState } from 'react';
import { v1 } from 'uuid';
import ToDoList from './components/ToDoList/ToDoList';
import darkBg from './img/dark-bg.jpg';
import lightBg from './img/light-bg.jpg';
import './styles/App.scss';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type ToDoListTypes = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

const App = () => {
  const toDoListID1 = v1();
  const toDoListID2 = v1();
  const toDoListID3 = v1();

  const [allToDoLists, setAllToDoLists] = useState<Array<ToDoListTypes>>([
    { id: toDoListID1, title: 'Cars', filter: 'all' },
    { id: toDoListID2, title: 'Watches', filter: 'all' },
    { id: toDoListID3, title: 'Movies', filter: 'all' },
  ]);

  const [tasksObj, setTasksObj] = useState({
    [toDoListID1]: [
      { id: v1(), title: 'Mercedes-Benz', isDone: false },
      { id: v1(), title: 'AUDI', isDone: true },
      { id: v1(), title: 'BMW', isDone: true },
      { id: v1(), title: 'Tesla', isDone: false },
      { id: v1(), title: 'Rolls-Royce', isDone: false },
    ],
    [toDoListID2]: [
      { id: v1(), title: 'CASIO', isDone: true },
      { id: v1(), title: 'Patek Philippe', isDone: true },
      { id: v1(), title: 'OMEGA', isDone: false },
      { id: v1(), title: 'TISSOT', isDone: false },
      { id: v1(), title: 'Longines', isDone: true },
    ],
    [toDoListID3]: [
      { id: v1(), title: 'Interstellar', isDone: true },
      { id: v1(), title: 'Inception', isDone: true },
      { id: v1(), title: 'Star Wars', isDone: false },
      { id: v1(), title: 'The Lord of the Rings', isDone: false },
      { id: v1(), title: 'Sherlock', isDone: true },
    ],
  });

  const removeToDoList = (toDoListID: string) => {
    let filteredAllToDoLists = allToDoLists.filter(
      (exactToDoList) => exactToDoList.id !== toDoListID
    );
    setAllToDoLists(filteredAllToDoLists);

    delete tasksObj[toDoListID];
    setTasksObj({ ...tasksObj });
  };
  //! AIM
  // нужно оптимизировать (при вводе обновляется весь объект tasksObj)
  const changeTaskName = (toDoListID: string, id: string, value: string) => {
    let task = tasksObj[toDoListID].find((t) => t.id === id);
    if (task) {
      task.title = value;
      setTasksObj({ ...tasksObj }); //todo
    }
  };
  //! AIM
  const removeTask = (id: string, toDoListID: string) => {
    let tasks = tasksObj[toDoListID];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[toDoListID] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  const addTask = (title: string, toDoListID: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[toDoListID];
    let newTasks = [newTask, ...tasks];
    tasksObj[toDoListID] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesType, id: string) => {
    let exactToDoList = allToDoLists.find(
      (eachToDoList) => eachToDoList.id === id
    );
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

  let [bgImg, setBgImage] = useState(lightBg);
  const themeSwitch = () => {
    const appDiv = document.querySelector('.App');
    appDiv?.classList.toggle('_dark');

    appDiv?.classList.contains('_dark') ? (bgImg = darkBg) : (bgImg = lightBg);
    setBgImage(bgImg);
  };

  return (
    <div className="App">
      {allToDoLists.length ? (
        <div className="grid-container">
          {allToDoLists.map((eachToDo) => {
            let tasksForTodoList = tasksObj[eachToDo.id];

            if (eachToDo.filter === 'completed') {
              tasksForTodoList = tasksForTodoList.filter(
                (task) => task.isDone === true
              );
            }
            if (eachToDo.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter(
                (task) => task.isDone === false
              );
            }

            return (
              <ToDoList
                key={eachToDo.id}
                id={eachToDo.id}
                filter={eachToDo.filter}
                title={eachToDo.title}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
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

      <button id="theme-button" onClick={themeSwitch}>
        Theme
      </button>
      <img id="background" src={bgImg} alt="Background Image" />
    </div>
  );
};

export default App;
