import { Select, Form, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ProjectSelector({ projects, selectedId, onChange }) {
  const navigate = useNavigate();
  const handleBoardClick = () => {
    navigate(`/board`);
    // navigate(`/board/${selectedId}`);
  };
  return (
    <Form layout="vertical">
      <Form.Item label="Select Project :">
        <Row gutter={16} align="middle">
          <Col>
            <Select
              value={selectedId}
              onChange={onChange}
              style={{ width: 300 }}
              placeholder="Choose a project"
            >
              {projects.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleBoardClick}
              disabled={!selectedId}
            >
              Go to Board
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}
