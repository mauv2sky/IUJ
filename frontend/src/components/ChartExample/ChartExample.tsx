import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './ChartExample.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '타이틀',
    },
  },
  scales: {
    y: {
      max: 1000, // 최대
      min: 0, // 최소
    },
  },
};

/** X축 라벨 */
const labels = ['January', 'February', 'March', 'April', 'May'];

export const data = {
  labels,
  datasets: [
    {
      label: '라벨',
      data: [200, 200, 400, 700, 500],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function ChartExample() {
  return (
    <div className={styles.component}>
      <div className={styles.chart}>
        <Line options={options} data={data} className="chart" />
      </div>
    </div>
  );
}
