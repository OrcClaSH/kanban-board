import { useMemo, useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { Column, Id } from "../types";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((item) => item.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    })
  );

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  function createColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((item) => item.id !== id);
    setColumns(filteredColumns);
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

  function onDragStart(event: DragStartEvent) {
    console.log("event DragStart", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.item);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    console.log("event DragEnd", event);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) {
      return;
    }

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

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
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
