import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

import { useColumns, ColumnContainer } from '@entities/column';
import { useTasks, TaskCard } from '@entities/task';

import { useDragFunctions } from '@shared/lib/hooks';
import { PlusIcon } from '@shared/ui/plus-icon';

export function KanbanBoard() {
  const {
    columns,
    activeColumn,
    columnsId,
    createColumn,
    deleteColumn,
    updateColumn,
    setActiveColumn,
    setColumns,
  } = useColumns();

  const {
    tasks,
    activeTask,
    createTask,
    deleteTask,
    updateTask,
    setActiveTask,
    setTasks,
  } = useTasks();

  const { onDragEnd, onDragOver, onDragStart } = useDragFunctions({
    setActiveColumn,
    setColumns,
    setActiveTask,
    setTasks,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    }),
  );

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    "
    >
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        onDragOver={onDragOver}
      >
        <div
          className="
      m-auto
      flex
      gap-4
      "
        >
          <div
            className="
        flex
        gap-4
        "
          >
            <SortableContext items={columnsId}>
              {columns.map((item) => (
                <ColumnContainer
                  key={item.id}
                  item={item}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === item.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="
      h-[60px]
      w-[350px]
      mix-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
    "
            onClick={() => createColumn()}
            type="button"
          >
            <PlusIcon /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                item={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
