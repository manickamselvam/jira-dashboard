import { useState } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import NavBar from '../components/layouts/NavBar';
import ProjectSelector from '../components/dashboard/ProjectSelector';
import TaskChart from '../components/dashboard/TaskChart';
import useProjectDashboard from '../hooks/useProjectDashboard'; // ✅ Import your hook
import './DashboardPage.css';

export default function DashboardPage() {
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const { projects, metrics } = useProjectDashboard(selectedProjectId); // ✅ Use hook

  const isLoading = projects.length === 0;

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
        {isLoading ? (
          <Spin tip="Loading dashboard..." />
        ) : (
          <>
            <ProjectSelector
              projects={projects}
              selectedId={selectedProjectId}
              onChange={setSelectedProjectId}
            />

            <Row gutter={16} style={{ marginTop: 24 }}>
              <Col span={4}>
                <Card title="Total Tasks">{metrics.total}</Card>
              </Col>
              <Col span={4}>
                <Card title="Completed">{metrics.completed}</Card>
              </Col>
              <Col span={4}>
                <Card title="In Progress">{metrics.inProgress}</Card>
              </Col>
              <Col span={4}>
                <Card title="In QA">{metrics.inQA}</Card>
              </Col>
              <Col span={4}>
                <Card title="Todo">{metrics.pending}</Card>
              </Col>
            </Row>

            <TaskChart stats={metrics} />
          </>
        )}
      </div>
    </>
  );
}
