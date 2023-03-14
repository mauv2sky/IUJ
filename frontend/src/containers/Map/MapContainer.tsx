import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import MapSidebar from '../../components/MapSidebar/MapSidebar';
import styles from './MapContainer.module.scss';

function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [clusterer, setClusterer] = useState<any>(null);

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
          console.log(bounds, '로 api 요청');

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
      <MapSidebar />
      <div ref={mapRef} style={{ width: 'calc(100% - 500px)' }} />
    </div>
  );
}

export default MapContainer;
