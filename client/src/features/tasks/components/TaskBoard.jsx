import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Space, Button, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  moveTaskThunk,
  addTask,
  updateTaskThunk,
  deleteTaskThunk,
} from '../taskBoardSlice';

import Column from './Column';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const { Title } = Typography;
const { confirm } = Modal;

const TaskBoard = ({ columns, tasks, columnOrder }) => {
  console.log('columns, tasks, columnOrder :', columns, tasks, columnOrder);

  const dispatch = useDispatch();

  const [activeTask, setActiveTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  const findContainer = useCallback(
    (id) => {
      if (columns[id]) return id;
      return (
        Object.keys(columns).find((columnId) =>
          columns[columnId].taskIds.includes(id)
        ) || null
      );
    },
    [columns]
  );

  const handleDragStart = ({ active }) => {
    const task = tasks?.[active.id];
    if (task) setActiveTask(task);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumnId = findContainer(activeId);
    const destinationColumnId = findContainer(overId);

    if (
      !sourceColumnId ||
      !destinationColumnId ||
      sourceColumnId === destinationColumnId
    ) {
      return;
    }

    dispatch(
      moveTaskThunk({
        taskId: activeId,
        newStatus: columns[destinationColumnId].status,
      })
    );
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  const handleAddTask = (status = 'todo') => {
    setDefaultStatus(status);
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
      onOk: () => dispatch(deleteTaskThunk(taskId)),
    });
  };

  const handleModalSubmit = (values) => {
    if (editingTask) {
      dispatch(
        updateTaskThunk({
          taskId: editingTask.id,
          updates: values,
        })
      );
    } else {
      dispatch(addTask(values));
    }
  };

  return (
    <div style={{ padding: 24, height: '100vh', overflow: 'auto' }}>
      <Space
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
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

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto' }}>
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((id) => tasks[id]);

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
          {activeTask && <TaskCard task={activeTask} />}
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
