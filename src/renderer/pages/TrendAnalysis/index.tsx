import React, { useState } from 'react';
import { Card, DatePicker, Space, Radio } from 'antd';
import { Line, Column } from '@ant-design/charts';
import styles from './TrendAnalysis.module.css';

const { RangePicker } = DatePicker;

const TrendAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState<[Date, Date]>();
  const [chartType, setChartType] = useState<'line' | 'column'>('line');

  // 示例数据
  const trendData = [
    { date: '2023-01', winRate: 52, kda: 2.8 },
    { date: '2023-02', winRate: 54, kda: 3.1 },
    { date: '2023-03', winRate: 58, kda: 3.5 },
    { date: '2023-04', winRate: 56, kda: 3.2 },
    { date: '2023-05', winRate: 60, kda: 3.8 }
  ];

  const config = {
    data: trendData,
    xField: 'date',
    yField: 'winRate',
    point: {
      size: 5,
      shape: 'diamond'
    }
  };

  return (
    <div className={styles.trendAnalysis}>
      <Card>
        <Space size="large">
          <RangePicker onChange={(dates) => setTimeRange(dates as [Date, Date])} />
          <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
            <Radio.Button value="line">折线图</Radio.Button>
            <Radio.Button value="column">柱状图</Radio.Button>
          </Radio.Group>
        </Space>
      </Card>

      <Card title="胜率趋势" className={styles.chart}>
        {chartType === 'line' ? (
          <Line {...config} />
        ) : (
          <Column {...config} />
        )}
      </Card>
    </div>
  );
};

export default TrendAnalysis; 