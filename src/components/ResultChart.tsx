import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis } from 'recharts';

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
