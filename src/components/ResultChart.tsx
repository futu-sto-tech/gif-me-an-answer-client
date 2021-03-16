import { Bar, BarChart, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

import React from 'react';

interface IResultChartProps {
  data: { playerName: string; points: number }[];
}

const ResultChart: React.FC<IResultChartProps> = ({ data }) => {
  const sanitisedData = data.map((d) => ({
    name: d.playerName,
    value: d.points,
    label: d.points === 1 ? `1 vote` : `${d.points} votes`,
  }));

  return (
    <ResponsiveContainer>
      <BarChart data={sanitisedData} margin={{ top: 32 }}>
        <XAxis dataKey="name" tickLine={false} stroke="white" />

        <Bar dataKey="value">
          <LabelList dataKey="label" position="top" fill="white" offset={8} />
          {sanitisedData.map((_, index) => (
            <Cell fill={index === 0 ? '#DD01A1' : '#8D0066'} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResultChart;
