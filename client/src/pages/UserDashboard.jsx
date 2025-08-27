import { Card, Typography } from 'antd';
import UserTable from '../features/userDashboard/components/UserTable';

const { Title } = Typography;

export default function UserDashboard() {
  return (
    // className={styles.container}
    <div>
      <Card>
        <Title level={3}>Users</Title>
        <UserTable />
      </Card>
    </div>
  );
}
