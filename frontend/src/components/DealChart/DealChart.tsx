import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './DealChart.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Colors, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    // title: {
    //   display: true,
    //   text: '최근 1년간 실거래 그래프',
    // },
  },
  scales: {
    y: {
      max: 30000, // 최대
      min: 0, // 최소
    },
  },
};

/** X축 라벨 */
const labels = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'];

export const data = {
  labels,
  datasets: [
    {
      label: '매매',
      data: [NaN, NaN, NaN, 18000, NaN, 16000, 20000, NaN, NaN, NaN, NaN, NaN],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '전세',
      data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: '월세',
      data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, 300, NaN, NaN, NaN, 500],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

export default function DealChart() {
  return (
    <div className={styles.component}>
      <div className={styles.chart}>
        <Line options={options} data={data} className="chart" />
      </div>
    </div>
  );
}
