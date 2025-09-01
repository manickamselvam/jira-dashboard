import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../features/projects/projectSlice';
import { fetchTasksByProject } from '../features/issues/issueSlice';

export default function useProjectDashboard(selectedProjectId) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);

  const tasks = useSelector((state) => state.issues.list);
  const [metrics, setMetrics] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    inQA: 0,
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProjectId) dispatch(fetchTasksByProject(selectedProjectId));
  }, [selectedProjectId, dispatch]);

  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'done').length;
    const pending = tasks.filter((t) => t.status === 'todo').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const inQA = tasks.filter((t) => t.status === 'qa').length;

    setMetrics({ total, completed, pending, inProgress, inQA });
  }, [tasks]);

  return { projects, tasks, metrics };
}
