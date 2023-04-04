// import React, { useEffect, useRef, useState } from 'react';
// import { Map } from 'react-kakao-maps-sdk';
// import { useNavigate } from 'react-router-dom';
// import DetailInformation, { DetailType } from '../../components/DetailInformation/DetailInformation';
// import styles from './DetailContainer.module.scss';
// import InfraIconamenities from '../../components/InfraIcon/InfraIconamenities';
// import InfraIconcultures from '../../components/InfraIcon/InfraIconcultures';
// import InfraIconschools from '../../components/InfraIcon/InfraIconschools';
// import InfraIconsecurities from '../../components/InfraIcon/InfraIconsecurities';
// import InfraIcontransports from '../../components/InfraIcon/InfraIcontransports';
// import axios from 'axios';
// import icon from '../../assets/icon.png';

// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { setdetailContainerState } from '../../store/slices/detailContainerSlice';

// /** 건물 타입과 건물 id */
// type Props = {};

// /** APIURL */
// const APIURL = 'http://localhost:5000';

// function Detailcontainer(props: Props) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<any>(null);
//   const [clusterer, setClusterer] = useState<any>(null);

//   const dispatch = useAppDispatch();
//   /** 매물 상세 정보 데이터 */
//   const [detailRelist, setDetailRelist] = useState<DetailType>();

//   /** 매물 상세 정보 요청 */
//   useEffect(() => {
//     axios({
//       method: 'get',
//       // url: APIURL + `/api/place/${props.type}/${props.id}`,
//       url: APIURL + `/api/place/APT/2`,
//     })
//       .then((response) => {
//         setDetailRelist(response.data);
//       })
//       .catch((error) => {
//         // console.error('데이터 전송 실패이냐옹');
//         console.error(error);
//       });
//   }, []);

//   const detailContainer = useAppSelector((state) => state.detailContainerSlice.detailContainer);

//   /** 매물 위치를 기반으로 지도 생성 */
//   const createMap = async () => {
//     if (window.kakao && window.kakao.maps && detailRelist) {
//       let lat;
//       let lng;

//       try {
//         lat = detailRelist.home.lat;
//         lng = detailRelist.home.lng;

//         const options = {
//           center: new window.kakao.maps.LatLng(lat, lng),
//           level: 4,
//         };

//         if (mapRef.current) {
//           /** map */
//           const map = new window.kakao.maps.Map(mapRef.current, options);

//           /** clusterer */
//           const clusterer = new kakao.maps.MarkerClusterer({
//             map,
//             averageCenter: true,
//             minLevel: 5,
//           });

//           /** 바깥에서 map 쓸 수 있게 */
//           setMap(map);

//           /** 바깥에서 clusterer 쓸 수 있게 */
//           setClusterer(clusterer);

//           /** 현재 영역 가져옴 */
//           const bounds = map.getBounds();

//           /** 현재 영역의 매물들 가져옴 */
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   /** 맵 생성 useEffect */
//   useEffect(() => {
//     createMap();
//   }, [detailRelist]);

//   const [dataList, setDataList] = useState<{ btnName: { id: number; name: string; lat: string; lng: string }[] }>({ btnName: [] });

//   /** 현재 영역 매물 요청 */
//   const handleBtnClick = (btnName: string) => {
//     /** 기존 맵, 클러스터러 초기화 */
//     clusterer.clear();
//     if (
//       btnName === '어린이집' ||
//       btnName === '유치원' ||
//       btnName === '초등학교' ||
//       btnName === '중학교' ||
//       btnName === '고등학교' ||
//       btnName === '특수학교' ||
//       btnName === '입시.검정 및 보습' ||
//       btnName === '예체능'
//     ) {
//       /** 백엔드에 인프라 데이터 요청 */
//       axios({
//         method: 'get',
//         // url: APIURL + `/api/place/${props.type}/${detailRelist.home.id}/${btnName}`,
//         url: APIURL + `/api/place/APT/${detailRelist?.home.id}/school`,
//       })
//         .then((response) => {
//           console.log('데이터 전송 성공이다멍멍 학군임');
//           // console.log(response.data);

//           if (btnName === '어린이집' || btnName === '유치원' || btnName === '초등학교' || btnName === '중학교' || btnName === '고등학교' || btnName === '특수학교') {
//             response.data.school.map((item: any) => {
//               if (item.type === btnName) {
//                 setDataList(item.schools);
//                 console.log(item.schools);
//                 /** 마커 이미지 */
//                 const markerImage = new kakao.maps.MarkerImage(
//                   icon, // 이미지 경로
//                   new kakao.maps.Size(30, 30), // 이미지 크기
//                 );
//                 /** api 요청으로 가져온 마커 리스트 */
//                 let markers = item.schools.map((data: any) => ({
//                   // Computed property name syntax
//                   latlng: new window.kakao.maps.LatLng(data.lat, data.lng),
//                 }));
//                 /** 마커 표시 */
//                 for (let i = 0; i < markers.length; i++) {
//                   const marker = new kakao.maps.Marker({
//                     map,
//                     position: markers[i].latlng,
//                     image: markerImage,
//                   });

//                   clusterer.addMarker(marker);
//                 }
//                 return;
//               }
//             });
//           } else {
//             response.data.academy.map((item: any) => {
//               if (item.type === btnName) {
//                 console.log(item.academys);
//                 setDataList(item.academys);

//                 /** 마커 이미지 */
//                 const markerImage = new kakao.maps.MarkerImage(
//                   icon, // 이미지 경로
//                   new kakao.maps.Size(30, 30), // 이미지 크기
//                 );
//                 /** api 요청으로 가져온 마커 리스트 */
//                 let markers = item.academys.map((data: any) => ({
//                   // Computed property name syntax

//                   latlng: new window.kakao.maps.LatLng(data.lng, data.type),
//                 }));
//                 /** 마커 표시 */
//                 for (let i = 0; i < markers.length; i++) {
//                   const marker = new kakao.maps.Marker({
//                     map,
//                     position: markers[i].latlng,
//                     image: markerImage,
//                   });

//                   clusterer.addMarker(marker);
//                 }
//                 return;
//               }
//             });
//           }
//         })
//         .catch((error) => {
//           console.error('데이터 전송 실패다멍멍 학군임');
//           // console.error(error);
//         });
//     } else {
//       /** 백엔드에 인프라 데이터 요청 */
//       axios({
//         method: 'get',
//         // url: APIURL + `/api/place/${props.type}/${detailRelist.home.id}/${btnName}`,
//         url: APIURL + `/api/place/APT/${detailRelist?.home.id}/${btnName}`,
//       })
//         .then((response) => {
//           console.log('데이터 전송 성공이다멍멍 학군아님');
//           console.log(response.data);
//           setDataList(response.data);
//           /** 마커 이미지 */
//           const markerImage = new kakao.maps.MarkerImage(
//             icon, // 이미지 경로
//             new kakao.maps.Size(30, 30), // 이미지 크기
//           );
//           /** api 요청으로 가져온 마커 리스트 */
//           console.log(btnName);
//           let markers = response.data[btnName].map((data: any) => ({
//             // Computed property name syntax
//             latlng: new window.kakao.maps.LatLng(data.lat, data.lng),
//           }));
//           /** 마커 표시 */
//           for (let i = 0; i < markers.length; i++) {
//             const marker = new kakao.maps.Marker({
//               map,
//               position: markers[i].latlng,
//               image: markerImage,
//             });

//             clusterer.addMarker(marker);
//           }
//         })
//         .catch((error) => {
//           console.error('데이터 전송 실패다멍멍 학군아님');
//           console.error(error);
//         });
//     }
//   };
//   const [tabIndex, setTabIndex] = useState(0);

//   const onClickTab = (index: number) => {
//     setTabIndex(index);
//   };

//   return (
//     <div className={styles.container}>
//       <div ref={mapRef} className={styles.map} />
//       <div className={styles.icon}>
//         <div className={styles.tab}>
//           <div onClick={() => onClickTab(0)} className={tabIndex === 0 ? styles.selected : styles['not-selected']}>
//             학군
//           </div>
//           <div onClick={() => onClickTab(1)} className={tabIndex === 1 ? styles.selected : styles['not-selected']}>
//             교통
//           </div>
//           <div onClick={() => onClickTab(2)} className={tabIndex === 2 ? styles.selected : styles['not-selected']}>
//             편의
//           </div>
//           <div onClick={() => onClickTab(3)} className={tabIndex === 3 ? styles.selected : styles['not-selected']}>
//             치안
//           </div>
//           <div onClick={() => onClickTab(4)} className={tabIndex === 4 ? styles.selected : styles['not-selected']}>
//             문화
//           </div>
//         </div>
//         {tabIndex === 0 && <InfraIconschools selectedBtn={''} setSelectedBtn={handleBtnClick} />}
//         {tabIndex === 1 && <InfraIcontransports selectedBtn={''} setSelectedBtn={handleBtnClick} />}
//         {tabIndex === 2 && <InfraIconamenities selectedBtn={''} setSelectedBtn={handleBtnClick} />}
//         {tabIndex === 3 && <InfraIconsecurities selectedBtn={''} setSelectedBtn={handleBtnClick} />}
//         {tabIndex === 4 && <InfraIconcultures selectedBtn={''} setSelectedBtn={handleBtnClick} />}
//       </div>
//       {detailRelist ? <DetailInformation detailRelist={detailRelist} /> : <></>}
//     </div>
//   );
// }

// export default Detailcontainer;

import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import DetailInformation, { DetailType } from '../../components/DetailInformation/DetailInformation';
import styles from './DetailContainer.module.scss';
import InfraIconamenities from '../../components/InfraIcon/InfraIconamenities';
import InfraIconcultures from '../../components/InfraIcon/InfraIconcultures';
import InfraIconschools from '../../components/InfraIcon/InfraIconschools';
import InfraIconsecurities from '../../components/InfraIcon/InfraIconsecurities';
import InfraIcontransports from '../../components/InfraIcon/InfraIcontransports';
import axios from 'axios';
import icon from '../../assets/icon.png';

/** 건물 타입과 건물 id */
interface DetailContainerProps {
  detailid: number;
  detailtype: string;
}

/** APIURL */
const APIURL = 'http://localhost:5000';

function Detailcontainer(props: DetailContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [clusterer, setClusterer] = useState<any>(null);

  /** 매물 상세 정보 데이터 */
  const [detailRelist, setDetailRelist] = useState<DetailType>();

  /** 매물 상세 정보 요청 */
  useEffect(() => {
    axios({
      method: 'get',
      url: APIURL + `/api/place/${props.detailtype}/${props.detailid}`,
    })
      .then((response) => {
        setDetailRelist(response.data);
      })
      .catch((error) => {
        // console.error('데이터 전송 실패이냐옹');
        console.error(error);
      });
  }, []);

  /** 매물 위치를 기반으로 지도 생성 */
  const createMap = async () => {
    if (window.kakao && window.kakao.maps && detailRelist) {
      let lat;
      let lng;

      try {
        lat = detailRelist.home.lat;
        lng = detailRelist.home.lng;

        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 4,
        };

        if (mapRef.current) {
          /** map */
          const map = new window.kakao.maps.Map(mapRef.current, options);

          /** clusterer */
          const clusterer = new kakao.maps.MarkerClusterer({
            map,
            averageCenter: true,
            minLevel: 5,
          });

          /** 바깥에서 map 쓸 수 있게 */
          setMap(map);

          /** 바깥에서 clusterer 쓸 수 있게 */
          setClusterer(clusterer);

          /** 현재 영역 가져옴 */
          const bounds = map.getBounds();

          /** 현재 영역의 매물들 가져옴 */
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /** 맵 생성 useEffect */
  useEffect(() => {
    createMap();
  }, [detailRelist]);

  const [dataList, setDataList] = useState<{ btnName: { id: number; name: string; lat: string; lng: string }[] }>({ btnName: [] });

  /** 현재 영역 매물 요청 */
  const handleBtnClick = (btnName: string) => {
    /** 기존 맵, 클러스터러 초기화 */
    clusterer.clear();
    if (
      btnName === '어린이집' ||
      btnName === '유치원' ||
      btnName === '초등학교' ||
      btnName === '중학교' ||
      btnName === '고등학교' ||
      btnName === '특수학교' ||
      btnName === '입시.검정 및 보습' ||
      btnName === '예체능'
    ) {
      /** 백엔드에 인프라 데이터 요청 */
      axios({
        method: 'get',
        // url: APIURL + `/api/place/${props.type}/${detailRelist.home.id}/${btnName}`,
        url: APIURL + `/api/place/APT/${detailRelist?.home.id}/school`,
      })
        .then((response) => {
          console.log('데이터 전송 성공이다멍멍 학군임');
          // console.log(response.data);

          if (btnName === '어린이집' || btnName === '유치원' || btnName === '초등학교' || btnName === '중학교' || btnName === '고등학교' || btnName === '특수학교') {
            response.data.school.map((item: any) => {
              if (item.type === btnName) {
                setDataList(item.schools);
                console.log(item.schools);
                /** 마커 이미지 */
                const markerImage = new kakao.maps.MarkerImage(
                  icon, // 이미지 경로
                  new kakao.maps.Size(30, 30), // 이미지 크기
                );
                /** api 요청으로 가져온 마커 리스트 */
                let markers = item.schools.map((data: any) => ({
                  // Computed property name syntax
                  latlng: new window.kakao.maps.LatLng(data.lat, data.lng),
                }));
                /** 마커 표시 */
                for (let i = 0; i < markers.length; i++) {
                  const marker = new kakao.maps.Marker({
                    map,
                    position: markers[i].latlng,
                    image: markerImage,
                  });

                  clusterer.addMarker(marker);
                }
                return;
              }
            });
          } else {
            response.data.academy.map((item: any) => {
              if (item.type === btnName) {
                console.log(item.academys);
                setDataList(item.academys);

                /** 마커 이미지 */
                const markerImage = new kakao.maps.MarkerImage(
                  icon, // 이미지 경로
                  new kakao.maps.Size(30, 30), // 이미지 크기
                );
                /** api 요청으로 가져온 마커 리스트 */
                let markers = item.academys.map((data: any) => ({
                  // Computed property name syntax

                  latlng: new window.kakao.maps.LatLng(data.lng, data.type),
                }));
                /** 마커 표시 */
                for (let i = 0; i < markers.length; i++) {
                  const marker = new kakao.maps.Marker({
                    map,
                    position: markers[i].latlng,
                    image: markerImage,
                  });

                  clusterer.addMarker(marker);
                }
                return;
              }
            });
          }
        })
        .catch((error) => {
          console.error('데이터 전송 실패다멍멍 학군임');
          // console.error(error);
        });
    } else {
      /** 백엔드에 인프라 데이터 요청 */
      axios({
        method: 'get',
        // url: APIURL + `/api/place/${props.type}/${detailRelist.home.id}/${btnName}`,
        url: APIURL + `/api/place/APT/${detailRelist?.home.id}/${btnName}`,
      })
        .then((response) => {
          console.log('데이터 전송 성공이다멍멍 학군아님');
          console.log(response.data);
          setDataList(response.data);
          /** 마커 이미지 */
          const markerImage = new kakao.maps.MarkerImage(
            icon, // 이미지 경로
            new kakao.maps.Size(30, 30), // 이미지 크기
          );
          /** api 요청으로 가져온 마커 리스트 */
          console.log(btnName);
          let markers = response.data[btnName].map((data: any) => ({
            // Computed property name syntax
            latlng: new window.kakao.maps.LatLng(data.lat, data.lng),
          }));
          /** 마커 표시 */
          for (let i = 0; i < markers.length; i++) {
            const marker = new kakao.maps.Marker({
              map,
              position: markers[i].latlng,
              image: markerImage,
            });

            clusterer.addMarker(marker);
          }
        })
        .catch((error) => {
          console.error('데이터 전송 실패다멍멍 학군아님');
          console.error(error);
        });
    }
  };
  const [tabIndex, setTabIndex] = useState(0);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} />
      <div className={styles.icon}>
        <div className={styles.tab}>
          <div onClick={() => onClickTab(0)} className={tabIndex === 0 ? styles.selected : styles['not-selected']}>
            학군
          </div>
          <div onClick={() => onClickTab(1)} className={tabIndex === 1 ? styles.selected : styles['not-selected']}>
            교통
          </div>
          <div onClick={() => onClickTab(2)} className={tabIndex === 2 ? styles.selected : styles['not-selected']}>
            편의
          </div>
          <div onClick={() => onClickTab(3)} className={tabIndex === 3 ? styles.selected : styles['not-selected']}>
            치안
          </div>
          <div onClick={() => onClickTab(4)} className={tabIndex === 4 ? styles.selected : styles['not-selected']}>
            문화
          </div>
        </div>
        {tabIndex === 0 && <InfraIconschools selectedBtn={''} setSelectedBtn={handleBtnClick} />}
        {tabIndex === 1 && <InfraIcontransports selectedBtn={''} setSelectedBtn={handleBtnClick} />}
        {tabIndex === 2 && <InfraIconamenities selectedBtn={''} setSelectedBtn={handleBtnClick} />}
        {tabIndex === 3 && <InfraIconsecurities selectedBtn={''} setSelectedBtn={handleBtnClick} />}
        {tabIndex === 4 && <InfraIconcultures selectedBtn={''} setSelectedBtn={handleBtnClick} />}
      </div>
      {detailRelist ? <DetailInformation detailRelist={detailRelist} /> : <></>}
    </div>
  );
}

export default Detailcontainer;
