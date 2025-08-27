import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag, Avatar, Typography, Space, Dropdown, Button } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const priorityColors = {
  low: 'blue',
  medium: 'orange',
  high: 'red',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const menuItems = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => onEdit?.(task),
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => onDelete?.(task.id),
    },
  ];

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        size="small"
        className="task-card"
        style={{
          marginBottom: 8,
          cursor: isDragging ? 'grabbing' : 'grab',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          boxShadow: isDragging
            ? '0 5px 15px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.1)',
        }}
        // bodyStyle={{ padding: '12px' }}
        {...listeners}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: 1 }}>
            <Text
              strong
              style={{
                fontSize: '14px',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              <Link to={`/task/${task.id}`} style={{ color: '#1677ff' }}>
                {task.title}
              </Link>
            </Text>

            <Paragraph
              style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '12px',
                lineHeight: 1.4,
              }}
              ellipsis={{ rows: 2 }}
            >
              {task.description}
            </Paragraph>

            <Space size="small" style={{ marginBottom: '8px' }}>
              <Tag color={priorityColors[task.priority]} size="small">
                {task.priority.toUpperCase()}
              </Tag>
            </Space>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Space size="small">
                <Avatar size="small" icon={<UserOutlined />} />
                <Text style={{ fontSize: '11px', color: '#999' }}>
                  {task.assignee}
                </Text>
              </Space>

              <Text style={{ fontSize: '10px', color: '#ccc' }}>
                {new Date(task.updatedAt).toLocaleDateString()}
              </Text>
            </div>
          </div>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              size="small"
              icon={<MoreOutlined />}
              style={{ marginLeft: '8px', flexShrink: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
