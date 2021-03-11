import { Bar, BarChart, XAxis, ResponsiveContainer, Cell } from 'recharts';

import React from 'react';

interface IResultChartProps {
  data: { playerName: string; points: number }[];
}

const ResultChart: React.FC<IResultChartProps> = ({ data }) => {
  const sanitisedData = data
    .map((d) => ({
      name: d.playerName,
      value: d.points,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer>
      <BarChart data={sanitisedData} margin={{ top: 50 }}>
        <XAxis dataKey="name" tickLine={false} stroke="white" />

        <Bar
          dataKey="value"
          label={{
            position: 'top',
            fill: 'white',
            formatter: (value) => (value === 1 ? `1 vote` : `${value} votes`),
          }}
        >
          {sanitisedData.map((_, index) => (
            <Cell fill={index === 0 ? '#DD01A1' : '#8D0066'} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResultChart;
