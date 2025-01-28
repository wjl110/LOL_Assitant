import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@components/Layout';
import Dashboard from '@pages/Dashboard';
import MatchAnalysis from '@pages/MatchAnalysis';
import ChampionCounter from '@pages/ChampionCounter';
import TrendAnalysis from '@pages/TrendAnalysis';
import TestAnalysis from '@components/MatchAnalysis/TestAnalysis';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/match-analysis',
        element: <MatchAnalysis />
      },
      {
        path: '/champion-counter',
        element: <ChampionCounter />
      },
      {
        path: '/trend-analysis',
        element: <TrendAnalysis />
      },
      {
        path: '/test-analysis',
        element: <TestAnalysis />
      }
    ]
  }
]); 