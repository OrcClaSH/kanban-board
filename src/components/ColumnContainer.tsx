import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import { useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { TaskCard } from "./TaskCard";

export function ColumnContainer({
  item,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  tasks,
}: {
  item: Column;
  tasks: Task[];
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (taskId: Id) => void;
}) {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "Column",
      item,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
    bg-columnBackgroundColor
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      opacity-60
      border-2
      border-rose-500
    "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
  "
    >
      <div
        {...attributes}
        {...listeners}
        className="
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-4
      border-columnBackgroundColor
      flex
      items-center
      justify-between
      "
        onClick={() => {
          setEditMode(true);
        }}
      >
        <div
          className="
        flex
        gap-2
        "
        >
          <div
            className="
      flex
      justify-center
      items-center
      bg-columnBackgroundColor
      px-2
      py-1
      text-sm
      rounded-full
        "
          >
            0
          </div>
          {!editMode && item.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={item.title}
              onChange={(e) => updateColumn(item.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
          onClick={() => deleteColumn(item.id)}
        >
          <TrashIcon />
        </button>
      </div>

      <div
        className="
      flex
      flex-grow
      flex-col
      gap-4
      p-2
      overflow-x-hidden
      overflow-y-auto
      "
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(item.id);
        }}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}
