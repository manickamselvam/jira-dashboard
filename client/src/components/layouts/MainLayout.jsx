import { Layout } from 'antd';
const { Header, Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout>
      <Header style={{ color: '#fff' }}>Jira Clone</Header>
      <Content style={{ padding: '24px' }}>{children}</Content>
    </Layout>
  );
}
