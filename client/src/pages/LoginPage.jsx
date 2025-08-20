// src/pages/LoginPage.jsx
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { Button, Input, Form } from 'antd';

export default function LoginPage() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    
    // Fake login
    const fakeUser = { name: 'Manickam', role: 'Admin' };
    const fakeToken = 'mock-jwt-token';
    dispatch(loginSuccess({ user: fakeUser, token: fakeToken }));
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  );
}
