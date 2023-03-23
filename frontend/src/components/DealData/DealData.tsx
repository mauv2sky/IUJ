// import React, { useEffect, useRef } from 'react';

// function DealData({ data, width, height }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // 그래프 그리기
//     ctx.beginPath();
//     ctx.moveTo(0, height - data[0]);
//     for (let i = 1; i < data.length; i++) {
//       ctx.lineTo((i * width) / (data.length - 1), height - data[i]);
//     }
//     ctx.strokeStyle = 'black';
//     ctx.stroke();
//   }, [data, width, height]);
//   return <canvas ref={canvasRef} width={width} height={height} />;
// }

// export default DealData;
import React from 'react';

function DealData() {
  return <div>DealData</div>;
}

export default DealData;
