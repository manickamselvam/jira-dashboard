import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import NavBar from '../components/layouts/NavBar';
import ProjectSelector from '../components/dashboard/ProjectSelector';
import TaskChart from '../components/dashboard/TaskChart';
import './DashboardPage.css';

const dummyProjects = [
  { id: 1, name: 'Taskero Web' },
  { id: 2, name: 'Taskero Mobile' },
  { id: 3, name: 'Taskero API' },
];

const dummyStats = {
  1: { total: 50, completed: 20, pending: 10, inProgress: 15, inQA: 5 },
  2: { total: 30, completed: 10, pending: 5, inProgress: 10, inQA: 5 },
  3: { total: 40, completed: 25, pending: 5, inProgress: 5, inQA: 5 },
};

export default function DashboardPage() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [stats, setStats] = useState(dummyStats[selectedProjectId]);

  useEffect(() => {
    setStats(dummyStats[selectedProjectId]);
  }, [selectedProjectId]);

  return (
    <>
      <NavBar />
      <div
        style={{
          padding: '24px',
          maxWidth: '100%',
          overflowX: 'hidden',
          width: '100vw',
        }}
      >
        <ProjectSelector
          projects={dummyProjects}
          selectedId={selectedProjectId}
          onChange={setSelectedProjectId}
        />

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={6}>
            <Card title="Total Tasks">{stats.total}</Card>
          </Col>
          <Col span={6}>
            <Card title="Completed">{stats.completed}</Card>
          </Col>
          <Col span={6}>
            <Card title="In Progress">{stats.inProgress}</Card>
          </Col>
          <Col span={6}>
            <Card title="In QA">{stats.inQA}</Card>
          </Col>
        </Row>

        <TaskChart stats={stats} />
      </div>
    </>
  );
}
