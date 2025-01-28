import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, TrophyOutlined, RiseOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  // 示例数据
  const winRateData = [
    { date: '2023-01', value: 52 },
    { date: '2023-02', value: 54 },
    { date: '2023-03', value: 58 },
    { date: '2023-04', value: 56 },
    { date: '2023-05', value: 60 }
  ];

  const config = {
    data: winRateData,
    xField: 'date',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond'
    },
    label: {
      style: {
        fill: '#aaa'
      }
    }
  };

  return (
    <div className={styles.dashboard}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总场次"
              value={156}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="胜率"
              value={54.5}
              suffix="%"
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="近期胜率趋势"
              value={6.8}
              prefix={<RiseOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card title="胜率趋势" className={styles.chart}>
        <Line {...config} />
      </Card>
    </div>
  );
};

export default Dashboard; 