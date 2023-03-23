import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import DetailInformation, { DetailType } from '../../components/DetailInformation/DetailInformation';
import styles from './DetailContainer.module.scss';

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
          area: [84.67, 25.6],
          floor: 6,
          contract_ym: 20230312,
          deal_type: '월세',
          guarantee: 200,
          price: 0,
          monthly: 30,
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
      어린이집: [{ name: '떡잎유치원', address: '부산 강서구 국제 6로 99 대방디엠시티센텀오션', latlng: [37.456, 127.789] }],
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

          /** api 요청으로 가져온 매물 리스트 */
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

      requestRealEstate();
    });
  }

  /** 드래그가 끝나면 새로운 매물 요청 */
  if (map) {
    kakao.maps.event.addListener(map, 'dragend', () => {
      const bounds = map.getBounds();
      console.log(bounds);
      console.log('드래그 이동 - 매물 요청');

      requestRealEstate();
    });
  }

  /** 현재 영역 매물 요청 */
  const requestRealEstate = () => {
    /** 기존 맵, 클러스터러 초기화 */
    clusterer.clear();

    /** 백엔드에 매물 요청 */
    console.log('매물 요청');

    /** api 요청으로 가져온 마커 리스트 */
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
  };

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} />
      <div className={styles.icon}>여긴 인프라 아이콘</div>
      <DetailInformation detailRelist={detailRelist} />
    </div>
  );
}

export default Detailcontainer;
