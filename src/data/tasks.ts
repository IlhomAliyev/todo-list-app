import { v1 } from 'uuid';
import { FilterValuesType } from '../App';

export type ToDoListTypes = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const allToDoListDefault: ToDoListTypes[] = [
  { id: v1(), title: 'Cars', filter: 'all' },
  { id: v1(), title: 'Watches', filter: 'all' },
  { id: v1(), title: 'Movies', filter: 'all' },
  { id: v1(), title: 'FAANG / MAANG', filter: 'all' },
  { id: v1(), title: 'Programming languages', filter: 'all' },
];

export const tasksObjectDefault = {
  [allToDoListDefault[0].id]: [
    { id: v1(), title: 'Mercedes-Benz', isDone: false },
    { id: v1(), title: 'AUDI', isDone: true },
    { id: v1(), title: 'BMW', isDone: true },
    { id: v1(), title: 'Tesla', isDone: false },
    { id: v1(), title: 'Rolls-Royce', isDone: false },
  ],
  [allToDoListDefault[1].id]: [
    { id: v1(), title: 'CASIO', isDone: true },
    { id: v1(), title: 'Patek Philippe', isDone: true },
    { id: v1(), title: 'OMEGA', isDone: false },
    { id: v1(), title: 'TISSOT', isDone: false },
    { id: v1(), title: 'Longines', isDone: true },
  ],
  [allToDoListDefault[2].id]: [
    { id: v1(), title: 'Interstellar', isDone: true },
    { id: v1(), title: 'Inception', isDone: true },
    { id: v1(), title: 'Star Wars', isDone: false },
    { id: v1(), title: 'The Lord of the Rings', isDone: false },
    { id: v1(), title: 'Sherlock', isDone: true },
  ],
  [allToDoListDefault[3].id]: [
    { id: v1(), title: 'Meta / Facebook', isDone: false },
    { id: v1(), title: 'Apple', isDone: false },
    { id: v1(), title: 'Amazon', isDone: false },
    { id: v1(), title: 'Netflix', isDone: false },
    { id: v1(), title: 'Google', isDone: false },
  ],
  [allToDoListDefault[4].id]: [
    { id: v1(), title: 'Rust', isDone: false },
    { id: v1(), title: 'Go', isDone: false },
    { id: v1(), title: 'Python', isDone: false },
    { id: v1(), title: 'JavaScript', isDone: true },
    { id: v1(), title: 'Ruby', isDone: false },
  ],
};
