import { Column, Task } from '@shared/types';

export const ColumnsDefaultData: Column[] = [
  {
    id: 'todo',
    title: 'Todo',
  },
  {
    id: 'doing',
    title: 'Work in progress',
  },
  {
    id: 'done',
    title: 'Done',
  },
];

export const TasksDefaultData: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    content:
      'Convince a spider to start a knitting club, but remind them not to get too tangled up in their own webs during the stitching sessions. Arachn-knit fun',
  },
  {
    id: '2',
    columnId: 'todo',
    content: 'Hug a cactus',
  },
  {
    id: '3',
    columnId: 'doing',
    content: 'Teach a goldfish karate',
  },
  {
    id: '4',
    columnId: 'doing',
    content: 'Train your pet rock',
  },
  {
    id: '5',
    columnId: 'done',
    content: 'Talk to a plant about your problems',
  },
  {
    id: '6',
    columnId: 'done',
    content: 'Try to high-five a ghost',
  },
  {
    id: '7',
    columnId: 'done',
    content: 'Give a mosquito a blood bank',
  },
  {
    id: '8',
    columnId: 'todo',
    content: 'Invent a language for squirrels',
  },
  {
    id: '9',
    columnId: 'todo',
    content: 'Challenge a snail to a race',
  },
  {
    id: '10',
    columnId: 'todo',
    content: 'Teach a parrot beatboxing',
  },
  {
    id: '11',
    columnId: 'todo',
    content: 'Convince a potato to chase its fry-destined dreams with enthusiasm.',
  },
];
