import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useAppSelector } from '../../store/hooks';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import MapSidebar from '../../components/MapSidebar/MapSidebar';
import { pretreatAmount } from '../../utils/PretreatAmount';
import { boundType, filterType } from '../../types/Map';
import { requestRealEstateList } from '../../api/map';
import styles from './MapContainer.module.scss';
import './Slider.scss';

/** 매물 목록 API 요청
 * 선호 순위 적용
 * 선호 순위 목록에서 선호 순위 적용
 * 매물 타입 변경 시,
 * 그 외 필터들 적용 버튼 클릭 시
 * 드래그 끝날 때
 * 지도 레벨 변경 시 */

/** 매매가 105000일 때는 2000000으로 바꿔서 보내기 */

type MapType = {
  [key: string]: string;
};

function MapContainer() {
  /** ================================================= useState, useRef, 변수 ================================================= */
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer | null>(null);
  const priority = useAppSelector((state) => state.prioritySlice.priority);
  const [showOption, setShowOption] = useState<number>(-1);
  const typeMap: MapType = {
    APT: '아파트',
    OFFICETEL: '오피스텔',
    VILLA: '연립다세대',
  };
  const [type, setType] = useState<string>('APT');
  const [dealType, setDealType] = useState<string>('BUY');
  const [price, setPrice] = useState<number[]>([0, 2000000]);
  const [guarantee1, setGuarantee1] = useState<number[]>([0, 2000000]);
  const [guarantee2, setGuarantee2] = useState<number[]>([0, 2000000]);
  const [monthly, setMonthly] = useState<number[]>([0, 5000]);
  const [extent, setExtent] = useState<number[]>([0, 662]);
  const [extent2, setExtent2] = useState<number[]>([0, 200]);
  const [floor, setFloor] = useState<number[]>([0, 100]);

  /** ================================================= useEffect ================================================= */
  /** 맵 생성 useEffect */
  useEffect(() => {
    createMap();
  }, []);

  /** map, clusterer 등록되면 초기 매물 요청 */
  useEffect(() => {
    if (map && clusterer) {
      requestRealEstateForMap();
    }
  }, [map, clusterer]);

  /** state에 있는 priority 변경 시 */
  useEffect(() => {
    requestRealEstateForMap();
  }, [priority]);

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

          /** 마커 표시 */
          // for (let i = 0; i < markers.length; i++) {
          //   const marker = new kakao.maps.Marker({
          //     map,
          //     position: markers[i].latlng,
          //   });

          //   clusterer.addMarker(marker);
          // }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /** bound 전처리 */
  const pretreatBound = (bound: kakao.maps.LatLngBounds) => {
    return {
      ne: [Object.entries(bound.getNorthEast())[1][1], Object.entries(bound.getNorthEast())[0][1]],
      sw: [Object.entries(bound.getSouthWest())[1][1], Object.entries(bound.getSouthWest())[0][1]],
    };
  };

  /** 현재 영역 매물 요청 */
  const requestRealEstateForMap = async () => {
    if (!clusterer || !map) {
      return;
    }

    /** 기존 맵, 클러스터러 초기화 */
    clusterer.clear();

    /** 지도의 영역과 레벨 불러오기 */
    const bound = pretreatBound(map.getBounds());
    const level = map.getLevel();

    /** 전세, 월세에 따른 보증금 전처리 */
    let guarantee;
    if (dealType === 'LONG_TERM_RENT') {
      guarantee = [guarantee1[0], guarantee1[1] === 105000 ? 2000000 : guarantee1[1]];
    } else {
      guarantee = [guarantee2[0], guarantee2[1] === 105000 ? 2000000 : guarantee2[1]];
    }

    /** 월세 전처리 */
    let monthlyForRequest;
    if (dealType === 'MONTHLY') {
      monthlyForRequest = [monthly[0], monthly[1] === 350 ? 5000 : monthly[1]];
    }

    /** 전처리 */
    const filter: filterType = {
      price: [price[0], price[1] === 105000 ? 2000000 : price[1]],
      guarantee,
      monthly: monthlyForRequest ? monthlyForRequest : monthly,
      extent: extent2,
      floor: [floor[0], floor[1] === 10 ? 100 : floor[1]],
    };

    console.log('아래 정보로 매물 요청', { bound, deal_type: dealType, filter, level, recomm: priority, type });

    /** 백엔드에 매물 요청 */
    try {
      const res = await requestRealEstateList({ bound, deal_type: dealType, filter, level, recomm: priority, type });
      console.log(res);
    } catch (err) {
      console.error(err);
    }

    /** 마커 표시 */
    // for (let i = 0; i < markers.length; i++) {
    //   const marker = new kakao.maps.Marker({
    //     map,
    //     position: markers[i].latlng,
    //   });

    //   clusterer.addMarker(marker);
    // }
  };

  /** ================================================= event handler ================================================= */
  /** 지도의 옵션 버튼 클릭 시 */
  const onClickOption = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<SVGElement>) => {
    const target = e.target as HTMLElement;
    const id = parseInt(target.id, 10);

    if (id === showOption) {
      setShowOption(-1);
    } else {
      setShowOption(id);
    }
  };

  /** 매물 타입 변경 시 */
  const onChangeType = (changedType: string) => {
    setType(changedType);
    setShowOption(-1);
  };

  /** 거래 유형 변경 시 */
  const onChangeDealType = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.target);
    const target = e.target as HTMLFormElement;
    setDealType(target.value);
  };

  /** 매매가 변경 시 */
  const onChangePrice = (priceRange: number[]) => {
    if (priceRange[0] > 100000) {
      setPrice([100000, priceRange[1]]);
    } else {
      setPrice(priceRange);
    }
  };

  /** 전세 보증금 변경 시 */
  const onChangeGuarantee1 = (guaranteeRange: number[]) => {
    if (guaranteeRange[0] > 100000) {
      setGuarantee1([100000, guaranteeRange[1]]);
    } else {
      setGuarantee1(guaranteeRange);
    }
  };

  /** 월세 보증금 변경 시 */
  const onChangeGuarantee2 = (guaranteeRange: number[]) => {
    if (guaranteeRange[0] > 100000) {
      setGuarantee2([100000, guaranteeRange[1]]);
    } else {
      setGuarantee2(guaranteeRange);
    }
  };

  /** 월세 변경 시 */
  const onChangeMonthly = (monthlyRange: number[]) => {
    if (monthlyRange[0] > 300) {
      setMonthly([300, monthlyRange[1]]);
    } else {
      setMonthly(monthlyRange);
    }
  };

  /** 방 넓이 변경 시 */
  const onChangeExtent = (extentRange: number[]) => {
    const extentMin = extentRange[0] > 199 ? 199 : extentRange[0];

    setExtent([Math.ceil(extentMin * 3.3058), Math.ceil(extentRange[1] * 3.3058)]);
    setExtent2([extentMin, extentRange[1]]);
  };

  /** 층수 변경 시 */
  const onChangeFloor = (floorRange: number[]) => {
    setFloor(floorRange);
  };

  /** 적용 버튼 클릭 시 */
  const onClickApply = () => {
    requestRealEstateForMap();
  };

  /** ================================================= Axios ================================================= */
  /** 지도 레벨이 변경되면 새로운 매물 요청 */
  if (map) {
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const bound = map.getBounds();
      console.log(bound);
      console.log('레벨 변경 - 매물 요청');

      // requestRealEstateForMap();
    });
  }

  /** 드래그가 끝나면 새로운 매물 요청 */
  if (map) {
    kakao.maps.event.addListener(map, 'dragend', () => {
      const bound = map.getBounds();
      console.log(bound);
      console.log('드래그 이동 - 매물 요청');

      // requestRealEstateForMap();
    });
  }

  return (
    <div className={styles.container}>
      <MapSidebar />
      <div className={styles.option}>
        <div className={styles['option-item']}>
          <button id="0" className={showOption === 0 ? `${styles['type-btn']} ${styles['selected-btn']}` : styles['type-btn']} onClick={onClickOption}>
            <span>{typeMap[type]}</span> {showOption !== 0 && <SlArrowDown id="0" onClick={onClickOption} />}{' '}
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
            {dealType === 'BUY' && (
              <p>
                <span>매매: </span>
                <span>
                  {pretreatAmount(price[0])} ~ {price[1] === 105000 || price[1] === 2000000 ? '무제한' : pretreatAmount(price[1])}
                </span>
              </p>
            )}
            {dealType === 'LONG_TERM_RENT' && (
              <p>
                <span>전세: </span>
                <span>
                  {pretreatAmount(guarantee1[0])} ~ {guarantee1[1] === 105000 || guarantee1[1] === 2000000 ? '무제한' : pretreatAmount(guarantee1[1])}
                </span>
              </p>
            )}
            {dealType === 'MONTHLY_RENT' && (
              <p>
                <span>월세: </span>
                <span>
                  {pretreatAmount(guarantee2[0])} ~ {guarantee2[1] === 105000 || guarantee2[1] === 2000000 ? '무제한' : pretreatAmount(guarantee2[1])}
                </span>
                <span style={{ margin: '0 0.5rem' }}> / </span>
                <span>
                  {pretreatAmount(monthly[0])} ~ {monthly[1] === 350 || monthly[1] === 5000 ? '무제한' : pretreatAmount(monthly[1])}
                </span>
              </p>
            )}
            {showOption !== 1 && <SlArrowDown id="1" onClick={onClickOption} />}
            {showOption === 1 && <SlArrowUp id="1" onClick={onClickOption} />}
          </button>
          {showOption === 1 && (
            <div className={styles['deal-type-div']}>
              <p className={styles['option-title']}>거래 유형</p>
              <form className={styles['deal-type']} onChange={onChangeDealType}>
                <label htmlFor="BUY">
                  <input id="BUY" name="deal-type" type="radio" value="BUY" defaultChecked={dealType === 'BUY' ? true : false} /> 매매
                </label>
                <label htmlFor="LONG_TERM_RENT">
                  <input id="LONG_TERM_RENT" name="deal-type" type="radio" value="LONG_TERM_RENT" defaultChecked={dealType === 'LONG_TERM_RENT' ? true : false} /> 전세
                </label>
                <label htmlFor="MONTHLY_RENT">
                  <input id="MONTHLY_RENT" name="deal-type" type="radio" value="MONTHLY_RENT" defaultChecked={dealType === 'MONTHLY_RENT' ? true : false} /> 월세
                </label>
              </form>
              <p className={styles['option-title']}>가격</p>
              {dealType == 'BUY' && (
                <div>
                  <p>
                    <span className={styles['amount-title']}>매매가 : </span>
                    <span className={styles['amount-content']}>
                      {pretreatAmount(price[0])} ~ {price[1] === 105000 || price[1] === 2000000 ? '무제한' : pretreatAmount(price[1])}
                    </span>
                  </p>
                  <RangeSlider id="slider" min={0} max={105000} step={5000} defaultValue={[0, 105000]} value={price} onInput={onChangePrice} />
                </div>
              )}
              {dealType == 'LONG_TERM_RENT' && (
                <div>
                  <p>
                    <span className={styles['amount-title']}>보증금 : </span>
                    <span className={styles['amount-content']}>
                      {pretreatAmount(guarantee1[0])} ~ {guarantee1[1] === 105000 || guarantee1[1] === 2000000 ? '무제한' : pretreatAmount(guarantee1[1])}
                    </span>
                  </p>
                  <RangeSlider id="slider" min={0} max={105000} step={5000} defaultValue={[0, 105000]} value={guarantee1} onInput={onChangeGuarantee1} />
                </div>
              )}
              {dealType == 'MONTHLY_RENT' && (
                <div>
                  <p>
                    <span className={styles['amount-title']}>보증금 : </span>
                    <span className={styles['amount-content']}>
                      {pretreatAmount(guarantee2[0])} ~ {guarantee2[1] === 105000 || guarantee2[1] === 2000000 ? '무제한' : pretreatAmount(guarantee2[1])}
                    </span>
                  </p>
                  <RangeSlider id="slider" min={0} max={105000} step={5000} defaultValue={[0, 105000]} value={guarantee2} onInput={onChangeGuarantee2} />
                  <p style={{ margin: '3rem 0 0 0' }}>
                    <span className={styles['amount-title']}>월세 : </span>
                    <span className={styles['amount-content']}>
                      {pretreatAmount(monthly[0])} ~ {monthly[1] === 350 || monthly[1] === 5000 ? '무제한' : pretreatAmount(monthly[1])}
                    </span>
                  </p>
                  <RangeSlider id="slider" min={0} max={350} step={50} defaultValue={[0, 350]} value={monthly} onInput={onChangeMonthly} />
                </div>
              )}
              <div className={styles['option-btn-div']} onClick={onClickApply}>
                <button>적용</button>
              </div>
            </div>
          )}
        </div>
        <div className={styles['option-item']}>
          <button id="2" className={showOption === 2 ? `${styles['extent-btn']} ${styles['selected-btn']}` : styles['extent-btn']} onClick={onClickOption}>
            <span>
              방 크기: {extent2[0]} 평 ~ {extent2[1]} 평
            </span>
            {showOption !== 2 && <SlArrowDown id="2" onClick={onClickOption} />} {showOption === 2 && <SlArrowUp id="2" onClick={onClickOption} />}
          </button>
          {showOption === 2 && (
            <div className={styles['extent-div']}>
              <p className={styles['option-title']}>방 크기(전용 면적)</p>
              <p style={{ margin: '0 0 2rem 0' }}>
                <span className={styles['amount-content']}>
                  {extent[0]}㎡ ({extent2[0]}평) ~ {extent[1]}㎡ ({extent2[1]}평)
                </span>
              </p>
              <RangeSlider id="slider" min={0} max={200} step={1} defaultValue={[0, 200]} value={extent2} onInput={onChangeExtent} />
              <div className={styles['option-btn-div']} onClick={onClickApply}>
                <button>적용</button>
              </div>
            </div>
          )}
        </div>
        <div className={styles['option-item']}>
          <button id="3" className={showOption === 3 ? `${styles['extent-btn']} ${styles['selected-btn']}` : styles['extent-btn']} onClick={onClickOption}>
            {floor[0] === 10 && <span>10층 이상</span>}
            {floor[0] !== 10 && (
              <span>
                층수: {floor[0]} 층 ~ {floor[1] === 10 || floor[1] === 100 ? '10층 이상' : floor[1] + ' 층'}
              </span>
            )}
            {showOption !== 3 && <SlArrowDown id="3" onClick={onClickOption} />} {showOption === 3 && <SlArrowUp id="3" onClick={onClickOption} />}
          </button>
          {showOption === 3 && (
            <div className={styles['extent-div']}>
              <p className={styles['option-title']}>층수</p>
              <p style={{ margin: '0 0 2rem 0' }}>
                {floor[0] === 10 && <span className={styles['amount-content']}>10층 이상</span>}
                {floor[0] !== 10 && (
                  <span className={styles['amount-content']}>
                    {floor[0]} 층 ~ {floor[1] === 10 || floor[1] === 100 ? '10층 이상' : floor[1] + ' 층'}
                  </span>
                )}
              </p>
              <RangeSlider id="slider" min={0} max={10} step={1} defaultValue={[0, 10]} value={floor} onInput={onChangeFloor} />
              <div className={styles['option-btn-div']} onClick={onClickApply}>
                <button>적용</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div ref={mapRef} style={{ width: 'calc(100% - 500px)' }} />
    </div>
  );
}

export default MapContainer;
