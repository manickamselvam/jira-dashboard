import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    issues: 0,
    users: 0,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        projects: 12,
        issues: 47,
        users: 8,
      });
    }, 500);
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Projects" variant="outlined">
            {stats.projects}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Issues" variant="outlined">
            {stats.issues}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Users" variant="outlined">
            {stats.users}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
