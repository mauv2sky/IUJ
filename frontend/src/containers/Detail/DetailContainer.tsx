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
import { detailTransport } from '../../types/Map';

interface DetailContainerProps {
  detailRelist: DetailType;
}
/** APIURL */
const APIURL = 'https://j8e103.p.ssafy.io';

function Detailcontainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [clusterer, setClusterer] = useState<any>(null);

  const detailRelist: DetailType = {
    place: {
      id: 1234,
      name: '송정삼정그린코아더시티',
      type: '아파트',
      latlng: [37.456, 127.789],
      address: ['부산시 강서구 녹산산단335로 7', '부산광역시 강서구 송정동 1627-5'],
      deal: [
        {
          type: '매매',
          aptDeals: [
            {
              id: 1,
              area: '84.9762',
              contract_ym: '202203',
              contract_day: '30',
              dealType: '매매',
              guarantee: 0,
              price: 0,
              floor: 1,
              monthly: 0,
              aptId: 1,
              author: null,
            },
          ],
        },
      ],
    },
    total_score: 87.56,
    map: {
      bus: [
        { name: '삼성 전기', latlng: [37.456, 127.789] },
        { name: '삼성 전기', latlng: [37.456, 127.789] },
      ],
      subway: [
        { name: '하단역', latlng: [37.456, 127.789] },
        { name: '기역', latlng: [37.456, 127.789] },
      ],
    },
    facility: {
      어린이집: [
        { name: '떡잎어린이집', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨어린이집', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '떡잎어린이집', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨어린이집', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      유치원: [
        { name: '떡잎유치원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨유치원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      초등학교: [
        { name: '떡잎초등학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨초등학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      중학교: [
        { name: '떡잎중학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨중학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      고등학교: [
        { name: '떡잎고등학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨도등학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      특수학교: [
        { name: '떡잎특수학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '치킨특수학교', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      입시학원: [
        { name: '아현영어학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '준수종합학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '호선수학학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '형규국어학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '미현과학학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
      예체능학원: [
        { name: '누리미술학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '준봉음악학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
        { name: '재훈태권도학원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] },
      ],
    },
  };

  /** 현재 위치 가져오기 */
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
      );
    });
  };

  /** 현재 위치를 기반으로 지도 생성 */
  const createMap = async () => {
    if (window.kakao && window.kakao.maps) {
      let lat;
      let lng;

      try {
        const position = await getCurrentPosition();
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat, lng);

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
          console.log(bounds.toString(), '로 api 요청');

          /** api 요청으로 가져온 인프라 리스트 */
          const markers = [
            {
              latlng: new window.kakao.maps.LatLng(35.1010816, 128.8503296),
            },
            {
              latlng: new window.kakao.maps.LatLng(35.103, 128.86),
            },
            {
              latlng: new window.kakao.maps.LatLng(35.098, 128.84),
            },
          ];

          /** 마커 표시 */
          for (let i = 0; i < markers.length; i++) {
            const marker = new kakao.maps.Marker({
              map,
              position: markers[i].latlng,
            });

            clusterer.addMarker(marker);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /** 맵 생성 useEffect */
  useEffect(() => {
    createMap();
  }, []);

  /** 지도 레벨이 변경되면 새로운 매물 요청 */
  if (map) {
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const bounds = map.getBounds();
      console.log(bounds);
      console.log('레벨 변경 - 매물 요청');

      // requestRealEstate();
    });
  }

  /** 드래그가 끝나면 새로운 매물 요청 */
  if (map) {
    kakao.maps.event.addListener(map, 'dragend', () => {
      const bounds = map.getBounds();
      console.log(bounds);
      console.log('드래그 이동 - 매물 요청');

      // requestRealEstate();
    });
  }
  const [dataList, setDataList] = useState<detailTransport[]>([]);

  /** 현재 영역 매물 요청 */
  const handleBtnClick = (btnName: string) => {
    /** 기존 맵, 클러스터러 초기화 */
    clusterer.clear();

    /** 백엔드에 인프라 데이터 요청 */
    console.log(btnName, '제대로 왔냐?');
    axios({
      method: 'get',
      url: APIURL + `/api/place/${detailRelist.place.type}/${detailRelist.place.id}/${btnName}`,
    })
      .then((response) => {
        console.log('데이터 전송 성공');
        console.log(response.data);
        setDataList(response.data);
      })
      .catch((error) => {
        console.error('데이터 전송 실패');
        console.error(error);
      });

    /** api 요청으로 가져온 마커 리스트 */
    console.log(dataList);
    let markers = [
      {
        latlng: new window.kakao.maps.LatLng(35.1010816, 128.8503296),
      },
      {
        latlng: new window.kakao.maps.LatLng(35.103, 128.86),
      },
    ];

    /** 마커 표시 */
    for (let i = 0; i < markers.length; i++) {
      const marker = new kakao.maps.Marker({
        map,
        position: markers[i].latlng,
      });

      clusterer.addMarker(marker);
    }
  };
  const [tabIndex, setTabIndex] = useState(0);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  // const handleBtnClick = (btnName: string) => {
  //   console.log(btnName, '제대로 왔냐?');
  //   axios
  //     .get(`${APIURL}/api/place/${detailRelist.place.type}/${detailRelist.place.id}/${btnName}`)
  //     .then((response) => {
  //       console.log('데이터 전송 성공');
  //       console.log(response.data);
  //       setDataList(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('데이터 전송 실패');
  //       console.error(error);
  //     });
  // };

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
        {tabIndex === 0 && <InfraIconschools />}
        {tabIndex === 1 && <InfraIcontransports selectedBtn={''} setSelectedBtn={handleBtnClick} />}
        {tabIndex === 2 && <InfraIconamenities />}
        {tabIndex === 3 && <InfraIconsecurities />}
        {tabIndex === 4 && <InfraIconcultures />}
      </div>
      <DetailInformation detailRelist={detailRelist} />
    </div>
  );
}

export default Detailcontainer;
