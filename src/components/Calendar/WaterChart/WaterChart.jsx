import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from 'recharts';

import css from './WaterChart.module.css';

const formatDate = (timestamp) => {
  const timestampNum = parseInt(timestamp, 10);
  if (isNaN(timestampNum)) {
    return 'Invalid Date';
  }
  const date = new Date(timestampNum);
  const day = date.getDate();
  return `${day}`;
};

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {
    const tooltipStyle = {
      backgroundColor: 'white',
      border: '1px solid white',
      padding: '10px',
      borderRadius: '10px',
      position: 'absolute',
      transform: 'translate(-50%, -100%)',
      left: `${coordinate.x}px`,
      top: `${coordinate.y}px`,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    };

    const labelStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
    };

    return (
      <div className="custom-tooltip" style={tooltipStyle}>
        <p style={labelStyle}>{`${payload[0].value} ml`}</p>
      </div>
    );
  }
  return null;
};

const WaterIntakeChart = ({ waterData }) => {
  // Убедитесь, что waterData передается в компонент
  const formattedData = waterData.slice(0, 7).map((item) => ({
    date: formatDate(item.date),
    originalAmount: item.amount,
  }));

  const weeklyAmount = formattedData.reduce(
    (acc, obj) => acc + obj.originalAmount,
    0,
  );

  const formatYAxisTick = (tick, index) => {
    if (index === 0) {
      return '0';
    }
    return `${(tick / 1000).toFixed(2)} L`;
  };

  return (
    <div className={css.graphContainer}>
      {weeklyAmount > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
                <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tickLine={false} tickMargin={21} />
            <YAxis
              domain={[0, 'auto']}
              tickCount={6}
              tickFormatter={formatYAxisTick}
              label={{ angle: -90, position: 'insideLeft' }}
              tickLine={false}
              tickMargin={53}
              tick={{ textAnchor: 'start' }}
            />
            <Tooltip
              cursor={false}
              position={{ y: -30 }}
              content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="originalAmount"
              stroke="#87D28D"
              fill="url(#colorUv)"
              dot={{
                fill: '#fff',
                stroke: '#87D28D',
                strokeWidth: 2,
                r: 8,
                fillOpacity: 1,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p className={css.nodata}>{'NO DATA FOR WEEKLY STATISTIC CHART'}</p>
      )}
    </div>
  );
};

export default WaterIntakeChart;
