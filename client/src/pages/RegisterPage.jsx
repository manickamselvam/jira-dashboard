import { Button, Input, Typography, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerSuccess } from '../features/auth/authSlice';
import './RegisterPage.css';
import { registerUser } from '../services/authService';
import { notifySuccess, notifyError } from '../utils/notify';
const { Title, Text } = Typography;

const RegisterSchema = Yup.object({
  name: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const FormField = ({ label, name, type = 'text', ...rest }) => (
  <div className="form-item">
    <label htmlFor={name}>{label}</label>
    <Field
      id={name}
      name={name}
      as={type === 'password' ? Input.Password : Input}
      {...rest}
    />
    <ErrorMessage name={name} component="div" className="error-text" />
  </div>
);

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log('form submitted value :', values);
    const { confirmPassword, ...payload } = values;
    const res = await registerUser(payload);
    if (res.status === 201 || res.message === 'User registered successfully') {
      notifySuccess('Registered!', 'You can now log in.');
      dispatch(registerSuccess({ user: res.user }));
      navigate('/dashboard', { replace: true });
    } else {
      notifyError('Oops...', 'Something went wrong!');
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card" variant="outlined">
        <Title level={3} style={{ textAlign: 'center' }}>
          Create Your Account
        </Title>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          <Form className="formik-form">
            <FormField
              label="Username"
              name="name"
              placeholder="Enter your username"
            />
            <FormField
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />

            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form>
        </Formik>

        <div className="login-link">
          <Text>Already have an account? </Text>
          <Button type="link" onClick={() => navigate('/login')}>
            Login here
          </Button>
        </div>
      </Card>
    </div>
  );
}
