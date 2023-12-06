import { useMemo, useState } from 'react';

import { generateId } from '@shared/lib/generate-id';
import { Column, Id } from '@shared/types';

import { useTasks } from '../../../task/lib/hooks/use-tasks';

export function useColumns() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((item) => item.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const { tasks, setTasks } = useTasks();

  function createColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((item) => item.id !== id);
    const filteredTasks = tasks.filter((task) => task.columnId !== id);
    setColumns(filteredColumns);
    setTasks(filteredTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return { ...item, title };
    });

    setColumns(newColumns);
  }

  return {
    columns,
    setColumns,
    columnsId,
    activeColumn,
    setActiveColumn,
    createColumn,
    deleteColumn,
    updateColumn,
  };
}
