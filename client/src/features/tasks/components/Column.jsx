import React from 'react';
import { Card, Typography, Badge, Button, Space } from 'antd';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusOutlined } from '@ant-design/icons';
import TaskCard from './TaskCard';

const { Title } = Typography;

const statusColors = {
  todo: '#f0f0f0',
  'in-progress': '#e6f7ff',
  done: '#f6ffed',
};

const headerColors = {
  todo: '#8c8c8c',
  'in-progress': '#1890ff',
  done: '#52c41a',
};

const Column = ({ column, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Card
      style={{
        width: 300,
        height: 'fit-content',
        minHeight: 400,
        backgroundColor: statusColors[column.status],
        border: isOver ? '2px solid #1890ff' : '1px solid #d9d9d9',
        borderRadius: '8px',
      }}
      //   bodyStyle={{ padding: '16px' }}
    >
      <div style={{ marginBottom: '16px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Title
              level={5}
              style={{
                margin: 0,
                color: headerColors[column.status],
                fontWeight: 600,
              }}
            >
              {column.title}
            </Title>
            <Badge
              count={tasks.length}
              style={{
                backgroundColor: headerColors[column.status],
              }}
            />
          </Space>

          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => onAddTask?.(column.status)}
            style={{
              color: headerColors[column.status],
            }}
          />
        </Space>
      </div>

      <div
        ref={setNodeRef}
        style={{
          minHeight: 300,
          transition: 'background-color 0.2s',
          borderRadius: '4px',
          padding: '8px',
          backgroundColor: isOver ? 'rgba(24, 144, 255, 0.1)' : 'transparent',
        }}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: '#999',
              fontSize: '14px',
              padding: '20px',
              fontStyle: 'italic',
            }}
          >
            No tasks yet
          </div>
        )}
      </div>
    </Card>
  );
};

export default Column;
