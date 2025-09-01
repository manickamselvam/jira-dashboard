import { Layout, Avatar, Typography, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './NavBar.css';
import { logout } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { logoutSucess } from '../../features/auth/authSlice';
import { notifySuccess } from '../../utils/notify';

const { Header } = Layout;
const { Title } = Typography;
const MySwal = withReactContent(Swal);

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showLogoutConfirm = () => {
    MySwal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Logging out...');
        const res = await logout();
        console.log('Logout response :', res);
        notifySuccess('Success', 'Logged Out Successfully');
        dispatch(logoutSucess());
        navigate('/login');
      }
    });
  };

  const menuItems = [
    {
      key: 'user-management',
      label: 'User Management',
      onClick: () => navigate('/user-management'),
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation(); // Prevent dropdown from closing
            showLogoutConfirm();
          }}
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <Header className="navbar">
      <Title level={4} className="product-name">
        Taskero
      </Title>
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Avatar
          src="https://i.pravatar.cc/150?img=3"
          style={{ cursor: 'pointer' }}
        />
      </Dropdown>
    </Header>
  );
}
