// src/features/tasks/components/TaskBoard.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Space, Button, Modal } from 'antd';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  moveTask,
  reorderTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../taskBoardSlice';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const { Title } = Typography;
const { confirm } = Modal;

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { tasks, columns, columnOrder } = useSelector(
    (state) => state.taskBoard
  );

  const [activeTask, setActiveTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px of movement required to start dragging
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks[active.id];
    setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // Handle moving between columns
    const activeIndex = columns[activeContainer].taskIds.indexOf(activeId);
    const overIndex = columns[overContainer].taskIds.indexOf(overId);

    if (overIndex === -1) {
      // Dropping on column itself
      dispatch(
        moveTask({
          taskId: activeId,
          sourceColumnId: activeContainer,
          destinationColumnId: overContainer,
          sourceIndex: activeIndex,
          destinationIndex: columns[overContainer].taskIds.length,
        })
      );
    } else {
      // Dropping on a task
      dispatch(
        moveTask({
          taskId: activeId,
          sourceColumnId: activeContainer,
          destinationColumnId: overContainer,
          sourceIndex: activeIndex,
          destinationIndex: overIndex,
        })
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      // Reordering within same column
      const activeIndex = columns[activeContainer].taskIds.indexOf(activeId);
      const overIndex = columns[overContainer].taskIds.indexOf(overId);

      if (activeIndex !== overIndex) {
        dispatch(
          reorderTasks({
            columnId: activeContainer,
            sourceIndex: activeIndex,
            destinationIndex: overIndex,
          })
        );
      }
    }
  };

  const findContainer = (id) => {
    if (columns[id]) {
      return id;
    }

    return (
      Object.keys(columns).find((columnId) =>
        columns[columnId].taskIds.includes(id)
      ) || null
    );
  };

  const handleAddTask = (status) => {
    setDefaultStatus(status || 'todo');
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    confirm({
      title: 'Delete Task',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this task?',
      onOk() {
        dispatch(deleteTask(taskId));
      },
    });
  };

  const handleModalSubmit = (values) => {
    if (editingTask) {
      dispatch(
        updateTask({
          taskId: editingTask.id,
          updates: values,
        })
      );
    } else {
      dispatch(addTask(values));
    }
  };

  return (
    <div
      style={{
        padding: '24px',
        height: '100vh',
        overflow: 'auto',
        maxWidth: '100%',
        width: '100vw',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={2} style={{ margin: 0 }}>
            Taskero
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAddTask()}
          >
            Add Task
          </Button>
        </Space>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '16px',
          }}
        >
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingTask={editingTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
};

export default TaskBoard;
