import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Divider } from 'antd';
import CommentsSection from '../features/taskDetail/CommentsSection';
import AttachmentsSection from '../features/taskDetail/AttachmentsSection';
import { fetchTasksById } from '../features/issues/issueSlice';

const { Title, Paragraph } = Typography;

const TaskDetailPage = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();

  const { list, status, error } = useSelector((state) => state.issues);
  const task = list;

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTasksById(taskId));
    }
  }, [dispatch, taskId]);

  if (status === 'loading') {
    return <div>Loading task...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: '100%', width: '100vw' }}>
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
