import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import TaskBoard from '../features/tasks/components/TaskBoard';
// import { getBoardByProject } from '../services/taskBoardService';
import { fetchTaskBoard } from '../features/tasks/taskBoardSlice';
import { useParams } from 'react-router-dom';

export default function TaskBoardPage() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { tasks, columns, columnOrder, loading } = useSelector(
    (state) => state.taskBoard
  );

  useEffect(() => {
    if (projectId) {
      console.log('taskboard effect called');
      dispatch(fetchTaskBoard(projectId)); // 👈 not getBoardByProject
    }
  }, [projectId, dispatch]);

  if (loading) return <Spin tip="Loading board..." />;

  return (
    <TaskBoard columns={columns} tasks={tasks} columnOrder={columnOrder} />
  );
}
