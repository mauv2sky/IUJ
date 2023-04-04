// import React from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import styles from './DealChart.module.scss';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Colors, Title, Tooltip, Legend);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     // title: {
//     //   display: true,
//     //   text: '최근 1년간 실거래 그래프',
//     // },
//   },
//   scales: {
//     y: {
//       max: 30000, // 최대
//       min: 0, // 최소
//     },
//   },
// };

// /** X축 라벨 */
// const labels = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: '매매',
//       data: [NaN, NaN, NaN, 18000, NaN, 16000, 20000, NaN, NaN, NaN, NaN, NaN],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: '전세',
//       data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
//       borderColor: 'rgb(54, 162, 235)',
//       backgroundColor: 'rgba(54, 162, 235, 0.5)',
//     },
//     {
//       label: '월세',
//       data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, 300, NaN, NaN, NaN, 500],
//       borderColor: 'rgb(75, 192, 192)',
//       backgroundColor: 'rgba(75, 192, 192, 0.5)',
//     },
//   ],
// };

// export default function DealChart() {
//   return (
//     <div className={styles.component}>
//       <div className={styles.chart}>
//         <Line options={options} data={data} className="chart" />
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
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

export type DealType = {
  datasets: {
    label: string;
    data: number[];
  };
  labels: number[];
}[];

export type DealPropsType = {
  dealChartlist: DealType;
};

export const chartdata = {
  labels,
  datasets: [
    {
      label: '매매',
      data: [10000, 20000, 15000, 25000, 30000, 20000, 22000, 23000, 25000, 27000, 28000, 29000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '전세',
      data: [8000, 15000, 10000, 20000, 25000, 20000, 18000, 20000, 22000, 24000, 25000, 27000],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: '월세',
      data: [5000, 7000, 6000, 10000, 12000, 8000, 9000, 10000, 12000, 13000, 14000, 15000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

export default function DealChart({ dealChartlist }: any) {
  const [chartData, setChartData] = useState(chartdata);
  const chartDatalist = dealChartlist;
  useEffect(() => {
    console.log('chartDatalist', chartDatalist);

    if (dealChartlist) {
      setChartData({
        labels,
        datasets: chartDatalist.datasets.map((data: any) => ({
          data: data.data,
          label: data.label,
          // borderColor: data.datasets.borderColor,
          // backgroundColor: data.datasets.backgroundColor,
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
