import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { mockMatchData } from '../../mocks/matchData';
import { analysisService } from '../../services/analysis';
import DetailedAnalysis from './DetailedAnalysis';
import { TeamAnalysis } from '@shared/types';

const TestAnalysis: React.FC = () => {
  const [analysis, setAnalysis] = useState<TeamAnalysis | null>(null);

  const handleAnalyze = async () => {
    try {
      const result = await analysisService.analyzeMatch(mockMatchData);
      setAnalysis(result);
    } catch (error) {
      message.error('分析失败');
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleAnalyze} type="primary" style={{ margin: '16px' }}>
        分析测试数据
      </Button>
      {analysis && <DetailedAnalysis analysis={analysis} />}
    </div>
  );
};

export default TestAnalysis; 