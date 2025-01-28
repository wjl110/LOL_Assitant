import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tooltip } from 'antd';
import { Line, Pie } from '@ant-design/charts';
import { TeamAnalysis, PlayerPerformance } from '@shared/types';
import styles from './DetailedAnalysis.module.css';

interface Props {
  analysis: TeamAnalysis;
}

const DetailedAnalysis: React.FC<Props> = ({ analysis }) => {
  const damageDistributionConfig = {
    data: analysis.playerPerformance.map(p => ({
      player: p.summonerName,
      value: p.stats.damageShare
    })),
    angleField: 'value',
    colorField: 'player'
  };

  const goldTimelineConfig = {
    data: analysis.timeline.map(t => ({
      time: t.timestamp,
      blueGold: t.blueTeam.totalGold,
      redGold: t.redTeam.totalGold
    })),
    xField: 'time',
    yField: ['blueGold', 'redGold']
  };

  const playerColumns = [
    {
      title: '玩家',
      dataIndex: 'summonerName',
      key: 'summonerName'
    },
    {
      title: 'KDA',
      dataIndex: ['stats', 'kda'],
      key: 'kda',
      render: (kda: number) => kda.toFixed(2)
    },
    {
      title: '参团率',
      dataIndex: ['stats', 'killParticipation'],
      key: 'killParticipation',
      render: (value: number) => (
        <Tooltip title={`${(value * 100).toFixed(1)}%`}>
          <Progress percent={value * 100} size="small" />
        </Tooltip>
      )
    },
    {
      title: '输出占比',
      dataIndex: ['stats', 'damageShare'],
      key: 'damageShare',
      render: (value: number) => (
        <Tooltip title={`${(value * 100).toFixed(1)}%`}>
          <Progress percent={value * 100} size="small" />
        </Tooltip>
      )
    },
    {
      title: '发育',
      dataIndex: ['stats', 'csPerMinute'],
      key: 'csPerMinute',
      render: (value: number) => `${value.toFixed(1)} CS/min`
    }
  ];

  return (
    <div className={styles.detailedAnalysis}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="团队对比">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Statistic title="经济差" value={analysis.teamStats.blue.gold - analysis.teamStats.red.gold} />
              </Col>
              <Col span={12}>
                <Statistic title="击杀比" value={`${analysis.teamStats.blue.kills}:${analysis.teamStats.red.kills}`} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="胜率预测">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Progress
                  type="circle"
                  percent={analysis.teamStats.blue.winProbability * 100}
                  format={percent => `蓝队 ${percent.toFixed(1)}%`}
                />
              </Col>
              <Col span={12}>
                <Progress
                  type="circle"
                  percent={analysis.teamStats.red.winProbability * 100}
                  format={percent => `红队 ${percent.toFixed(1)}%`}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card title="输出分布" className={styles.chartCard}>
        <Pie {...damageDistributionConfig} />
      </Card>

      <Card title="经济走势" className={styles.chartCard}>
        <Line {...goldTimelineConfig} />
      </Card>

      <Card title="选手表现">
        <Table
          columns={playerColumns}
          dataSource={analysis.playerPerformance}
          rowKey="participantId"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default DetailedAnalysis; 