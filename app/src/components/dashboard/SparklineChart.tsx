import { memo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  data: number[];
  color: string;
}

export const SparklineChart = memo(function SparklineChart({ data, color }: Props) {
  const mapped = data.map((v, i) => ({ i, v }));

  const colorMap: Record<string, string> = {
    leaf: '#4A7C3F',
    sky: '#4A8FBF',
    sun: '#D4A017',
    terracotta: '#C75B2A',
  };

  const stroke = colorMap[color] || color;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mapped}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={stroke}
          strokeWidth={2}
          dot={false}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});
