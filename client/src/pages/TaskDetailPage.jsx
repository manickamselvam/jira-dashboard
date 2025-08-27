import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Typography, Divider } from 'antd';
import CommentsSection from '../features/taskDetail/CommentsSection';
import AttachmentsSection from '../features/taskDetail/AttachmentsSection';

const { Title, Paragraph } = Typography;

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const task = useSelector((state) => state.board?.issues[taskId] || []);

  if (!task) return <div>Task not found</div>;

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={4}>{task.title}</Title>
        <Paragraph>{task.description}</Paragraph>
        <Divider />
        <CommentsSection taskId={taskId} />
        <Divider />
        <AttachmentsSection taskId={taskId} />
      </Card>
    </div>
  );
};

export default TaskDetailPage;
