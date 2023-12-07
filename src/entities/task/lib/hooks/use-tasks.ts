import { useState } from 'react';

import { TasksDefaultData } from '@shared/config/config';
import { generateId } from '@shared/lib';
import { Id, Task } from '@shared/types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(TasksDefaultData);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function updateTask(id: Id, content: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, content };
    });

    setTasks(updatedTasks);
  }

  function deleteTask(taskId: Id) {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  }

  return {
    tasks,
    setTasks,
    activeTask,
    setActiveTask,
    createTask,
    updateTask,
    deleteTask,
  };
}
