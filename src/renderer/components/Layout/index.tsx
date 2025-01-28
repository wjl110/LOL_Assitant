import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  SearchOutlined,
  TeamOutlined,
  LineChartOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import styles from './Layout.module.css';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">仪表盘</Link>
    },
    {
      key: '/match-analysis',
      icon: <SearchOutlined />,
      label: <Link to="/match-analysis">对局分析</Link>
    },
    {
      key: '/champion-counter',
      icon: <TeamOutlined />,
      label: <Link to="/champion-counter">英雄克制</Link>
    },
    {
      key: '/trend-analysis',
      icon: <LineChartOutlined />,
      label: <Link to="/trend-analysis">趋势分析</Link>
    },
    {
      key: '/test-analysis',
      icon: <ExperimentOutlined />,
      label: <Link to="/test-analysis">测试分析</Link>
    }
  ];

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>LOL 对战分析助手</div>
      </Header>
      <Layout>
        <Sider width={200} className={styles.sider}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className={styles.menu}
          />
        </Sider>
        <Layout className={styles.mainContent}>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 