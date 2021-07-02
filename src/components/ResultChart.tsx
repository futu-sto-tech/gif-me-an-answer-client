import { Bar, BarChart, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

import React from 'react';

interface IResultChartProps {
  data: { playerName: string; points: number; votedBy: string[] }[];
}

const ResultChart: React.FC<IResultChartProps> = ({ data }) => {
  const sanitisedData = data.map((d) => ({
    name: d.playerName,
    value: d.points,
    label: d.points === 1 ? `1 vote` : `${d.points} votes`,
    votedBy: d.votedBy,
  }));

  return (
    <ResponsiveContainer>
      <BarChart data={sanitisedData} margin={{ top: 32 }}>
        <XAxis dataKey="name" tickLine={false} stroke="white" />

        <Bar dataKey="value">
          <LabelList dataKey="label" position="top" fill="white" offset={8} />
          <LabelList dataKey="votedBy" content={renderCustomizedLabel} />

          {sanitisedData.map((_, index) => (
            <Cell fill={index === 0 ? '#DD01A1' : '#8D0066'} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props as { x: number; y: number; width: number; value: string[] };
  const radius = 10;

  return (
    <g>
      {value &&
        value.map((playerId, index) => (
          <text
            x={x + width / 2}
            y={y + 50 + index * 2.5 * radius}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {playerId}
          </text>
        ))}
    </g>
  );
};

export default ResultChart;
