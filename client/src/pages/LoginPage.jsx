import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { Button, Input, Form, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We'll add styles here
import { loginUser } from '../services/authService';
import { notifySuccess, notifyError } from '../utils/notify';

const { Title, Text } = Typography;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Login comp values :', values);
    const res = await loginUser(values);
    console.log('API Res :', res);
    if (res.message === 'Login successful') {
      notifySuccess('Success', 'You can now log in.');
      dispatch(loginSuccess({ user: res.user }));
      navigate('/dashboard', { replace: true });
    } else {
      notifyError('Oops...', 'Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" variant="outlined">
        <Title level={3} style={{ textAlign: 'center' }}>
          Login to Taskero
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter your email" />
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
