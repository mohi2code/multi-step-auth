import { useState } from "react"
import { Layout, Menu, Button, Table, Tag, Space, Popconfirm } from "antd"
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { users_data } from "./mock/users";

const { Sider, Header, Content } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Users',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#FFFFFF',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "#FFFFFF",
          }}
        >
          <Table 
            columns={columns}
            dataSource={users_data}
            rowKey='id'
            scroll={{ x: 800, y: 500 }}
          />
        </Content>
      </Layout>
    </Layout>
  )
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <span key={record.id}>{`${text} ${record.last_name}`}</span>,
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    render: (text, record) => <>{`${text}, ${record.country}`}</>
  },
  {
    title: 'Account Status',
    key: 'status',
    dataIndex: 'is_verified',
    render: (_, { is_verified }) => (
      is_verified === 'true' 
      ? 
        <Tag color="green">verified</Tag>
      :
         <Tag color="red">not verified</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {record?.is_verified === 'false' && <a>Activate</a>}
        <Popconfirm
          title="Delete this account"
          description="Are you sure to delete this user account?"
          okText="Delete"
          cancelText="Cancel"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export default App
