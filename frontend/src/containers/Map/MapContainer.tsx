import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import MapSidebar from '../../components/MapSidebar/MapSidebar';
import styles from './MapContainer.module.scss';
import { pretreatAmount } from '../../utils/PretreatAmount';

/** 매매가 105000일 때는 2000000으로 바꿔서 보내기 */

type MapType = {
  [key: string]: string;
};

function MapContainer() {
  /** ================================================= useState, useRef, 변수 ================================================= */
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [clusterer, setClusterer] = useState<any>(null);
  const [showOption, setShowOption] = useState<number>(-1);
  const typeMap: MapType = {
    APT: '아파트',
    OFFICETEL: '오피스텔',
    VILLA: '연립다세대',
  };
  const [type, setType] = useState<string>('APT');
  const dealTypeMap: MapType = {
    BUY: '매매',
    LONG_TERM_RENT: '전세',
    MONTHLY_RENT: '월세',
  };
  const [dealType, setDealType] = useState<string>('BUY');
  const [price, setPrice] = useState<number[]>([0, 2000000]);
  const [guarantee, setGuarantee] = useState<number[]>([0, 2000000]);
  const [monthly, setMonthly] = useState<number[]>([0, 5000]);

  /** ================================================= useEffect ================================================= */
  /** 맵 생성 useEffect */
  useEffect(() => {
    createMap();
  }, []);

  /** ================================================= 함수 ================================================= */
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

          /** useState, 바깥에서 map 쓸 수 있게 */
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

  /** ================================================= event handler ================================================= */
  const onClickOption = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<SVGElement>) => {
    const target = e.target as HTMLElement;
    console.log(target);
    const id = parseInt(target.id, 10);

    console.log(id);

    if (id === showOption) {
      setShowOption(-1);
    } else {
      setShowOption(id);
    }
  };

  const onChangeType = (changedType: string) => {
    setType(changedType);
    setShowOption(-1);
  };

  const onChangeDealType = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    setDealType(target.value);
  };

  const onChangeAmount = (priceRange: number[]) => {
    setPrice(priceRange);
    console.log(price);
  };

  /** ================================================= Axios ================================================= */
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

  return (
    <div className={styles.container}>
      <MapSidebar />
      <div className={styles.option}>
        <div className={styles['option-item']}>
          <button id="0" className={showOption === 0 ? `${styles['type-btn']} ${styles['selected-btn']}` : styles['type-btn']} onClick={onClickOption}>
            <span style={{ minWidth: '100px' }}>{typeMap[type]}</span> {showOption !== 0 && <SlArrowDown id="0" onClick={onClickOption} />}{' '}
            {showOption === 0 && <SlArrowUp id="0" onClick={onClickOption} />}
          </button>
          {showOption === 0 && (
            <div className={styles['type-div']}>
              <p className={styles['option-title']}>매물 종류</p>
              {Object.entries(typeMap).map((item) => (
                <p
                  key={item[0]}
                  onClick={() => {
                    onChangeType(item[0]);
                  }}
                  className={styles['type-item']}
                >
                  {item[1]}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className={styles['option-item']}>
          <button id="1" className={showOption === 1 ? `${styles['deal-type-btn']} ${styles['selected-btn']}` : styles['deal-type-btn']} onClick={onClickOption}>
            <span>{dealTypeMap[dealType]}</span> {showOption !== 1 && <SlArrowDown id="1" onClick={onClickOption} />}
            {showOption === 1 && <SlArrowUp id="1" onClick={onClickOption} />}
          </button>
          {showOption === 1 && (
            <div className={styles['deal-type-div']}>
              <p className={styles['option-title']}>거래 유형</p>
              <form className={styles['deal-type']} onChange={onChangeDealType}>
                <label>
                  <input name="deal-type" type="radio" value="BUY" /> 매매
                </label>
                <label>
                  <input name="deal-type" type="radio" value="LONG_TERM_RENT" /> 전세
                </label>
                <label>
                  <input name="deal-type" type="radio" value="MONTHLY_RENT" /> 월세
                </label>
              </form>
              <p className={styles['option-title']}>가격</p>
              {dealType == 'BUY' && (
                <div>
                  <p>
                    <span className={styles['amount-title']}>매매가 : </span>
                    <span className={styles['amount-content']}>
                      {pretreatAmount(price[0])} ~ {price[1] === 105000 || 2000000 ? '무제한' : pretreatAmount(price[1])}
                    </span>
                  </p>
                  <RangeSlider id={styles.slider} min={0} max={105000} step={5000} defaultValue={[0, 105000]} value={price} onInput={onChangeAmount} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div ref={mapRef} style={{ width: 'calc(100% - 500px)' }} />
    </div>
  );
}

export default MapContainer;
