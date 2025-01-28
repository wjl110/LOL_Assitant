import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Table, Tag, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { matchService } from '@services/api';
import { analysisService } from '@services/analysis';
import { MatchData } from '@shared/types';
import styles from './MatchAnalysis.module.css';

const MatchAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [summonerName, setSummonerName] = useState('');
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  const handleSearch = async () => {
    if (!summonerName) return;
    
    setLoading(true);
    try {
      const response = await matchService.getCurrentMatch(summonerName);
      setMatchData(response.data);
    } catch (error) {
      console.error('获取对局数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (matchId: string) => {
    try {
      const match = await matchService.getMatch(matchId);
      if (match) {
        const analysis = await analysisService.analyzeMatch(match);
        // 显示分析结果
        // 可以打开一个模态框或者新的页面显示详细分析
      }
    } catch (error) {
      message.error('分析失败');
    }
  };

  const columns = [
    {
      title: '召唤师',
      dataIndex: 'summonerName',
      key: 'summonerName',
    },
    {
      title: '英雄',
      dataIndex: 'championName',
      key: 'championName',
    },
    {
      title: '位置',
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => (
        <Tag color="blue">{position}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleAnalyze(record.gameId)}>
            分析
          </Button>
          <Button type="link">详情</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.matchAnalysis}>
      <Card>
        <Input.Search
          placeholder="输入召唤师名称"
          enterButton={<SearchOutlined />}
          size="large"
          value={summonerName}
          onChange={e => setSummonerName(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
        />
      </Card>

      {matchData && (
        <Card title="当前对局" className={styles.matchInfo}>
          <Table
            columns={columns}
            dataSource={matchData.participants}
            rowKey="participantId"
            loading={loading}
          />
        </Card>
      )}
    </div>
  );
};

export default MatchAnalysis; 