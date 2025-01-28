import React, { useState } from 'react';
import { Card, Select, Table, Rate, Space } from 'antd';
import styles from './ChampionCounter.module.css';

const ChampionCounter: React.FC = () => {
  const [selectedChampion, setSelectedChampion] = useState<string>();
  const [loading, setLoading] = useState(false);

  // 示例数据
  const champions = [
    { value: 'Ahri', label: '阿狸' },
    { value: 'Zed', label: '劫' },
    { value: 'Yasuo', label: '亚索' },
  ];

  const counterData = [
    {
      champion: '卡特琳娜',
      winRate: 45.6,
      difficulty: 3,
      description: '前期压制，注意躲避飞刀',
    },
    {
      champion: '妖姬',
      winRate: 47.2,
      difficulty: 4,
      description: '灵活性高，注意预判位移',
    },
  ];

  const columns = [
    {
      title: '克制英雄',
      dataIndex: 'champion',
      key: 'champion',
    },
    {
      title: '胜率',
      dataIndex: 'winRate',
      key: 'winRate',
      render: (winRate: number) => `${winRate}%`,
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty: number) => (
        <Rate disabled defaultValue={difficulty} />
      ),
    },
    {
      title: '克制要点',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div className={styles.championCounter}>
      <Card>
        <Space size="large">
          <Select
            style={{ width: 200 }}
            placeholder="选择英雄"
            options={champions}
            value={selectedChampion}
            onChange={setSelectedChampion}
            showSearch
          />
        </Space>
      </Card>

      {selectedChampion && (
        <Card title="克制推荐" className={styles.counterInfo}>
          <Table
            columns={columns}
            dataSource={counterData}
            rowKey="champion"
            loading={loading}
          />
        </Card>
      )}
    </div>
  );
};

export default ChampionCounter; 