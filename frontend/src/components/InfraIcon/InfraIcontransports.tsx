// import React, { useState } from 'react';
// import styles from './InfraIcontransports.module.scss';
// import { FaBus } from 'react-icons/fa';
// import { FaSubway } from 'react-icons/fa';
// import axios from 'axios';

// type Props = {
//   id: number;
//   type: string;
// };

// function InfraIcontransports(props: Props) {
//   const [selectedBtn, setSelectedBtn] = useState('');

//   /** 버스 버튼 클릭 시 */
//   const onClickBusBtn = () => {
//     console.log('버스정류장 위치 요청');
//     setSelectedBtn(selectedBtn === 'bus' ? '' : 'bus');
//   };

//   /** 지하철 버튼 클릭 시 */
//   const onClickSubwayBtn = () => {
//     console.log('지하철 위치 요청');
//     setSelectedBtn(selectedBtn === 'subway' ? '' : 'subway');
//   };

//   return (
//     <div className={styles.component}>
//       <div className={styles.iconall}>
//         <div className={`${styles.iconborder} ${selectedBtn === 'bus' ? styles.selected : ''}`} onClick={onClickBusBtn}>
//           <span className={styles.icon}>
//             <FaBus />
//           </span>
//         </div>
//         <p className={styles.icontext}>버스</p>
//       </div>
//       <div className={styles.iconall}>
//         <div className={`${styles.iconborder} ${selectedBtn === 'subway' ? styles.selected : ''}`} onClick={onClickSubwayBtn}>
//           <span className={styles.icon}>
//             <FaSubway />
//           </span>
//         </div>
//         <p>지하철</p>
//       </div>
//     </div>
//   );
// }

// export default InfraIcontransports;

// // /** APIURL */
// // const APIURL = 'http://localhost:5000';
// // axios
// // .get(`${APIURL}/api/place/${type}/${id}/transport`)
// // .then((response) => {
// //   console.log('데이터 전송 성공');
// //   console.log(response.data);
// // })
// // .catch((error) => {
// //   console.error('데이터 전송 실패');
// //   console.error(error);
// // });
import React, { useState, useEffect } from 'react';
import styles from './InfraIcontransports.module.scss';
import { FaBus } from 'react-icons/fa';
import { FaSubway } from 'react-icons/fa';
import axios from 'axios';

type Props = {
  id: number;
  type: string;
  onSelectedBtn: (type: string, locations: { lat: number; lng: number }[]) => void;
};

function InfraIcontransports(props: Props) {
  const [selectedBtn, setSelectedBtn] = useState('');
  const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    /** APIURL */
    const APIURL = 'http://localhost:5000';
    if (selectedBtn) {
      axios
        .get(`${APIURL}/api/place/${props.type}/${props.id}/transport`)
        .then((response) => {
          console.log('데이터 전송 성공');
          console.log(response.data);
          setLocations(response.data.locations);
        })
        .catch((error) => {
          console.error('데이터 전송 실패');
          console.error(error);
        });
    }
  }, [selectedBtn, props.type, props.id]);

  /** 버튼 클릭 시 */
  const onClickBtn = (type: string) => {
    console.log(`${type} 위치 요청`);
    setSelectedBtn(selectedBtn === type ? '' : type);
    props.onSelectedBtn(type, locations);
  };

  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'bus' ? styles.selected : ''}`} onClick={() => onClickBtn('bus')}>
          <span className={styles.icon}>
            <FaBus />
          </span>
        </div>
        <p className={styles.icontext}>버스</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'subway' ? styles.selected : ''}`} onClick={() => onClickBtn('subway')}>
          <span className={styles.icon}>
            <FaSubway />
          </span>
        </div>
        <p>지하철</p>
      </div>
    </div>
  );
}

export default InfraIcontransports;
