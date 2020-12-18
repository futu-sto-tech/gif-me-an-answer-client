import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis } from 'recharts';

// interface IBarChartProps {
//   gameState: Game;
// }

const DATA = [
  {
    'name': 'Page A',
    'value': 4000,
  },
  {
    'name': 'Page B',
    'value': 3000,
  },
  {
    'name': 'Page C',
    'value': 2000,
  },
  {
    'name': 'Page D',
    'value': 2780,
  },
  {
    'name': 'Page E',
    'value': 1890,
  },
  {
    'name': 'Page F',
    'value': 2390,
  },
  {
    'name': 'Page G',
    'value': 3490,
  },
];

const ResultChart: React.FC = () => {
  return (
    <ResponsiveContainer>
      <BarChart data={DATA} margin={{ top: 50 }}>
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis dataKey="name" tickLine={false} stroke="white" />

        <Bar dataKey="value" fill="#DD01A1">
          <LabelList dataKey="value" position="top" offset={10} className="fill-current text-white" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResultChart;
