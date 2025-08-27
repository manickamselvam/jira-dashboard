import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { Button, Input, Form, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We'll add styles here

const { Title, Text } = Typography;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const fakeUser = { name: 'Manickam', role: 'Admin' };
    const fakeToken = 'mock-jwt-token';
    dispatch(loginSuccess({ user: fakeUser, token: fakeToken }));
  };

  return (
    <div className="login-container">
      <Card className="login-card" variant="outlined">
        <Title level={3} style={{ textAlign: 'center' }}>
          Login to Taskero
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
        {/* 👇 Register Link */}
        <div className="register-link">
          <Text>Don’t have an account? </Text>
          <Button type="link" onClick={() => navigate('/register')}>
            Register here
          </Button>
        </div>
      </Card>
    </div>
  );
}
