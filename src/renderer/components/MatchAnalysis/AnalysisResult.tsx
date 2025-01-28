import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { TeamAnalysis } from '@shared/types';
import styles from './AnalysisResult.module.css';

interface Props {
  analysis: TeamAnalysis;
}

const AnalysisResult: React.FC<Props> = ({ analysis }) => {
  return (
    <div className={styles.analysisResult}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="蓝队数据">
            <Statistic title="击杀" value={analysis.teamStats.blue.kills} />
            <Statistic title="经济" value={analysis.teamStats.blue.gold} />
            <Progress
              percent={analysis.teamStats.blue.winProbability * 100}
              status="active"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="红队数据">
            <Statistic title="击杀" value={analysis.teamStats.red.kills} />
            <Statistic title="经济" value={analysis.teamStats.red.gold} />
            <Progress
              percent={analysis.teamStats.red.winProbability * 100}
              status="active"
            />
          </Card>
        </Col>
      </Row>

      <Card title="关键事件" className={styles.eventsCard}>
        {analysis.keyEvents.map((event, index) => (
          <div key={index} className={styles.event}>
            <span className={styles.eventTime}>{event.time}</span>
            <span className={styles.eventDescription}>{event.description}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AnalysisResult; 