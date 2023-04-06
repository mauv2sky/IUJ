import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './DealChart.module.scss';
import { ChartDataType } from '../../types/Chart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Colors, Title, Tooltip, Legend);

export default function DealChart({ dealChartlist, min, max }: any) {
  const [chartData, setChartData] = useState<ChartDataType>({ labels: [], datasets: [] });
  const chartDatalist = dealChartlist;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        max: max + 500, // 최대
        min: 0, // 최소
      },
    },
    elements: {
      line: {
        spanGaps: true,
      },
    },
  };

  useEffect(() => {
    if (dealChartlist) {
      setChartData({
        labels: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'],
        datasets: chartDatalist.datasets.map((data: any) => ({
          data: data.data,
          label: data.label,
        })),
      });
    }
  }, [dealChartlist]);

  return (
    <div className={styles.component}>
      <div className={styles.chart}>
        <Line options={options} data={chartData} className="chart" />
      </div>
    </div>
  );
}
