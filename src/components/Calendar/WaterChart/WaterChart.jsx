import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
} from 'recharts';

import css from './WaterChart.module.css';
import { useSelector } from 'react-redux';
import { selectWaterByMonth } from '../../../redux/water/selectors';

// Функция для форматирования дня и месяца
const formatDayMonth = (day, month) => {
    const formattedDay = String(day).padStart(2, '0');   // Форматируем день с ведущим нулём
    const formattedMonth = String(month).padStart(2, '0'); // Форматируем месяц с ведущим нулём

    return `${formattedDay}.${formattedMonth}`; // Возвращаем формат 'DD.MM'
};

// Кастомный тултип для отображения данных
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
            <div
                className='custom-tooltip'
                style={tooltipStyle}>
                <p style={labelStyle}>{`${payload[0].value} ml`}</p>
            </div>
        );
    }

    return null;
};

const WaterChart = () => {
    // Получение данных о воде за месяц из селектора
    const waterData = useSelector(selectWaterByMonth);

    console.log("Water data for the active month:", waterData);

    // Маппинг данных с использованием полей day и month, и сортировка по дням
    const formattedData = waterData
        .filter((item) => item.amount > 0)  // Отфильтровываем только данные, где количество воды больше 0
        .map((item) => ({
            date: formatDayMonth(item.day, item.month),  // Отображаем день и месяц
            day: Number(item.day), // Преобразуем день в число для сортировки
            originalAmount: item.amount,  // Количество выпитой воды
        }))
        .sort((a, b) => a.day - b.day);  // Сортируем по дням

    // Вычисляем общую сумму воды
    const totalAmount = formattedData.reduce(
        (acc, obj) => acc + obj.originalAmount,
        0
    );

    // Функция для форматирования оси Y (в литрах)
    const formatYAxisTick = (tick, index) => {
        if (index === 0) {
            return '0L';
        }

        return `${(tick / 1000).toFixed(1)} l`;
    };

    return (
        <div className={css.graphContainer}>
            {totalAmount > 0 ? (
                <ResponsiveContainer
                    width='100%'
                    height='100%'>
                    <AreaChart
                        data={formattedData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 10,
                        }}>
                        <defs>
                            <linearGradient
                                id='colorUv'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'>
                                <stop
                                    offset='0%'
                                    stopColor='#9BE1A0'
                                    stopOpacity={1}
                                />
                                <stop
                                    offset='100%'
                                    stopColor='#9BE1A0'
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey='date'  // Отображаем день и месяц на оси X
                            tickLine={false}
                            tickMargin={21}
                        />
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
                            type='monotone'
                            dataKey='originalAmount'
                            stroke='#87D28D'
                            fill='url(#colorUv)'
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
                <p className={css.nodata}>
                    {'No water data available for the selected month.'}
                </p>
            )}
        </div>
    );
};

export default WaterChart;
