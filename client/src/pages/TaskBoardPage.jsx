import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Button } from 'antd';
import TaskBoard from '../features/tasks/components/TaskBoard';
import { fetchTaskBoard } from '../features/tasks/taskBoardSlice';
import { useParams } from 'react-router-dom';

export default function TaskBoardPage() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // Memoized selector to prevent unnecessary re-renders
  const taskBoardData = useSelector((state) => state.taskBoard);

  const memoizedData = useMemo(
    () => ({
      tasks: taskBoardData.tasks,
      columns: taskBoardData.columns,
      columnOrder: taskBoardData.columnOrder,
      loading: taskBoardData.loading,
      error: taskBoardData.error,
    }),
    [
      taskBoardData.tasks,
      taskBoardData.columns,
      taskBoardData.columnOrder,
      taskBoardData.loading,
      taskBoardData.error,
    ]
  );

  useEffect(() => {
    if (projectId) {
      console.log('taskboard effect called for project:', projectId);
      dispatch(fetchTaskBoard(projectId));
    }
  }, [projectId, dispatch]);

  if (memoizedData.loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" tip="Loading board..." />
      </div>
    );
  }

  if (memoizedData.error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <h3>Error loading task board</h3>
        <p>{memoizedData.error}</p>
        <Button onClick={() => dispatch(fetchTaskBoard(projectId))}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <TaskBoard
      columns={memoizedData.columns}
      tasks={memoizedData.tasks}
      columnOrder={memoizedData.columnOrder}
      loading={memoizedData.loading}
    />
  );
}
