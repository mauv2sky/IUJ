import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useAppSelector } from '../../store/hooks';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillHouseFill } from 'react-icons/bs';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import MapSidebar from '../../components/MapSidebar/MapSidebar';
import { pretreatAmount } from '../../utils/PretreatAmount';
import { filterType, RealEstateType, requestRealEstateListType, TypeMappingType } from '../../types/MapType';
import { requestSearch, requestRealEstateList } from '../../api/map';
import AppliedPriority from '../../components/AppliedPriority/AppliedPriority';
import { DocumentType, MetaType } from '../../types/SearchType';
import SearchList from '../../components/SearchList/SearchList';
import ReactDOMServer from 'react-dom/server';
import styles from './MapContainer.module.scss';
import './Slider.scss';

/** ============= 매물 목록 API 요청 필요 =============
 * 선호 순위 적용 시
 * 선호 순위 목록에서 선호 순위 적용 시
 * 매물 타입 변경 시,
 * 그 외 필터들 적용 버튼 클릭 시
 * 드래그 끝날 때
 * 지도 레벨 변경 시 */

/** 매물 타입 영-한 매핑 */
export const typeMap: TypeMappingType = {
  APT: '아파트',
  OFFICETEL: '오피스텔',
  VILLA: '연립다세대',
};

function MapContainer() {
  /** ================================================= useState, useRef, 변수 ================================================= */
  /** 카카오 맵 담을 div */
  const mapRef = useRef<HTMLDivElement>(null);
  /** 선호 필터 */
  const priority = useAppSelector((state) => state.prioritySlice.priority);
  /** 어떤 옵션(필터) 창이 보여지는지 */
  const [showOption, setShowOption] = useState<number>(-1);
  /** 매물 타입 (아파트, 오피스텔, 연립다세대) */
  const [type, setType] = useState<string>('APT');
  /** 거래 타입 (매매, 전세, 월세) */
  const [dealType, setDealType] = useState<string>('BUY');
  /** 매매가 */
  const [price, setPrice] = useState<number[]>([0, 2000000]);
  /** 전세 보증금 */
  const [guarantee1, setGuarantee1] = useState<number[]>([0, 2000000]);
  /** 월세 보증금 */
  const [guarantee2, setGuarantee2] = useState<number[]>([0, 2000000]);
  /** 월세 */
  const [monthly, setMonthly] = useState<number[]>([0, 5000]);
  /** 방 크기 (전용면적) */
  const [extent, setExtent] = useState<number[]>([0, 662]);
  /** 방 크기 (평수) */
  const [extent2, setExtent2] = useState<number[]>([0, 200]);
  /** 층수 */
  const [floor, setFloor] = useState<number[]>([0, 100]);
  /** 카카오 맵 생성시 사용할 옵션 */
  const [mapOptions, setMapOptions] = useState<kakao.maps.MapOptions | undefined>(undefined);
  /** 지도 레벨, props 용도 */
  const [stateLevel, setStateLevel] = useState<number>(4);
  /** 부동산 매물 리스트, 마커 + 매물 목록에 사용 */
  const [realEstateList, setRealEstateList] = useState<RealEstateType[]>([]);
  /** 카카오 맵 state */
  const [stateMap, setStateMap] = useState<kakao.maps.Map | undefined>(undefined);
  /** 클러스터러 state */
  const [stateClusterer, setStateClusterer] = useState<kakao.maps.MarkerClusterer | undefined>(undefined);
  /** 지도 세팅 됐는지 */
  const [mapSetted, setMapSetted] = useState<boolean>(false);
  /** 맵 이벤트가 일어나는지 추적용 */
  const [mapEvent, setMapEvent] = useState<number>(0);
  /** 검색 결과 document */
  const [document, setDocument] = useState<DocumentType[]>([]);
  /** 검색 내용, 초기화 용도 */
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  /** 검색 지역 클릭 시 검색 내용 초기화 용도 */
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  /** 중심 좌표 state */
  const [stateCenter, setStateCenter] = useState<number[]>([]);
  /** 드래그 시 실거래 목록 스크롤 초기화 용도 */
  const [dragEnded, setDragEnded] = useState<boolean>(false);

  /** ================================================= useEffect ================================================= */
  /** 맵 옵션 불러오기 */
  useEffect(() => {
    getMapOptions();
  }, []);

  /** 맵 생성 */
  useEffect(() => {
    if (mapOptions) {
      const map = new window.kakao.maps.Map(mapRef.current as HTMLElement, mapOptions as kakao.maps.MapOptions);
      setStateMap(map);

      const clusterer = new kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: 5,
      });
      setStateClusterer(clusterer);

      setMapSetted(true);
    }
  }, [mapOptions]);

  /** 맵 이벤트(드래그, 레벨 체인지) 적용 */
  useEffect(() => {
    if (!mapSetted || !stateMap || !stateClusterer) {
      return;
    }

    requestRealEstateForMap(stateMap, stateClusterer, type, dealType, price, guarantee1, guarantee2, monthly, extent2, floor, priority);

    kakao.maps.event.addListener(stateMap, 'dragend', () => {
      setMapEvent((prev) => prev + 1);
    });
    kakao.maps.event.addListener(stateMap, 'zoom_changed', () => {
      setMapEvent((prev) => prev + 1);
    });

    return () => {
      kakao.maps.event.removeListener(stateMap, 'dragend', () => {
        setMapEvent((prev) => prev + 1);
      });
      kakao.maps.event.removeListener(stateMap, 'zoom_changed', () => {
        setMapEvent((prev) => prev + 1);
      });
    };
  }, [mapSetted]);

  /** 매물 타입, 거래 타입, 선호 필터 변경, 맵 이벤트 => 매물 바로 불러오기 */
  useEffect(() => {
    if (!mapSetted || !stateMap || !stateClusterer) {
      return;
    }

    requestRealEstateForMap(stateMap, stateClusterer, type, dealType, price, guarantee1, guarantee2, monthly, extent2, floor, priority);
  }, [type, dealType, priority, mapEvent]);

  /** 가격, 전세 보증금, 월세 보증금, 월세, 방 크기, 층수 변경 => 일정 텀 이후에 매물 불러오기 */
  useEffect(() => {
    if (!mapSetted || !stateMap || !stateClusterer) {
      return;
    }

    let timeOutId: number | undefined; // 텀 두고 이벤트 실행하기 위한 변수

    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      requestRealEstateForMap(stateMap, stateClusterer, type, dealType, price, guarantee1, guarantee2, monthly, extent2, floor, priority);
    }, 700);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [price, guarantee1, guarantee2, monthly, extent2, floor]);

  /** 검색 아이템 클릭으로 인한 지도 센터 변경 => 매물 바로 불러오기 */
  useEffect(() => {
    if (!mapSetted || !stateMap || !stateClusterer) {
      return;
    }

    requestRealEstateForMap(stateMap, stateClusterer, type, dealType, price, guarantee1, guarantee2, monthly, extent2, floor, priority, stateCenter);
  }, [stateCenter]);

  /** 검색 내용 클릭 시, 검색 키워드 초기화 */
  useEffect(() => {
    setSearchKeyword('');
  }, [searchClicked]);

  /** ================================================= 함수 ================================================= */
  /** 현재 위치를 기반으로 지도 옵션 설정하기 */
  const getMapOptions = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setMapOptions({
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 4,
          });
        },
        (error) => {
          reject(error);
        },
      );
    });
  };

  /** bound 전처리 */
  const pretreatBound = (bound: kakao.maps.LatLngBounds) => {
    return {
      ne: [Object.entries(bound.getNorthEast())[1][1], Object.entries(bound.getNorthEast())[0][1]],
      sw: [Object.entries(bound.getSouthWest())[1][1], Object.entries(bound.getSouthWest())[0][1]],
    };
  };

  /** 현재 영역 매물 요청 */
  const requestRealEstateForMap = async (
    map: kakao.maps.Map | undefined,
    clusterer: kakao.maps.MarkerClusterer | undefined,
    requestType: string,
    requestDealType: string,
    requestPrice: number[],
    requestGuarantee1: number[],
    requestGuarantee2: number[],
    requestMonthly: number[],
    requestExtent: number[],
    requestFloor: number[],
    priority: string[],
    requestCenter?: number[],
  ) => {
    if (!map || !clusterer) {
      return;
    }

    /** 기존 맵, 클러스터러 초기화 */
    clusterer.clear();

    if (requestCenter) {
      map.setCenter(new kakao.maps.LatLng(requestCenter[0], requestCenter[1]));
    }

    /** 지도의 영역과 레벨 불러오기 */
    const bound = pretreatBound(map.getBounds());
    const mapLevel = map.getLevel();
    setStateLevel(mapLevel);

    if (mapLevel > 5) {
      return;
    }

    /** 전세, 월세에 따른 보증금 전처리 */
    let requestGuarantee;
    if (requestDealType === 'LONG_TERM_RENT') {
      requestGuarantee = [requestGuarantee1[0], requestGuarantee1[1] === 105000 ? 2000000 : requestGuarantee1[1]];
    } else {
      requestGuarantee = [requestGuarantee2[0], requestGuarantee2[1] === 105000 ? 2000000 : requestGuarantee2[1]];
    }

    /** 월세 전처리 */
    let monthlyForRequest;
    if (requestDealType === 'MONTHLY') {
      monthlyForRequest = [requestMonthly[0], requestMonthly[1] === 350 ? 5000 : requestMonthly[1]];
    }

    /** 전처리 */
    const filter: filterType = {
      price: [requestPrice[0], requestPrice[1] === 105000 ? 2000000 : requestPrice[1]],
      guarantee: requestGuarantee,
      monthly: monthlyForRequest ? monthlyForRequest : requestMonthly,
      extent: requestExtent,
      floor: [requestFloor[0], requestFloor[1] === 10 ? 100 : requestFloor[1]],
    };

    const requestInfo: requestRealEstateListType = { bound, deal_type: requestDealType, filter, level: mapLevel, recomm: priority, type: requestType };

    console.log('매물 request: ', requestInfo);

    /** 매물 요청 */
    try {
      const res = await requestRealEstateList(requestInfo);
      console.log('매물 response: ', res);

      setRealEstateList(res.data);

      /** 커스텀 */
      const markers = res.data.map((realEstate: RealEstateType) => {
        const getMarkerColor = (totalScore: number): string => {
          if (totalScore >= 80) {
            return '#1C81DE';
          } else if (totalScore >= 60) {
            return '#6593BE';
          } else if (totalScore >= 30) {
            return '#768797';
          } else {
            return 'gray';
          }
        };

        const contentInner = (
          <div className={styles['marker-div']}>
            <BsFillHouseFill
              className={styles.marker}
              color={getMarkerColor(Math.round(realEstate.total_score))}
              style={{ left: Math.round(realEstate.total_score) >= 10 ? '40%' : '27.5%' }}
            />
            {realEstate.total_score !== null && <p>{Math.round(realEstate.total_score)}</p>}
          </div>
        );

        const content = window.document.createElement('div');
        content.innerHTML = ReactDOMServer.renderToString(contentInner);
        content.addEventListener('click', () => {
          onClickRealEstate(realEstate.type, realEstate.id);
        });

        const customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(realEstate.latlng[0], realEstate.latlng[1]),
          content,
          yAnchor: 0.5,
          zIndex: 100,
          clickable: true,
        });
        customOverlay.setMap(map);

        return {
          type: realEstate.type,
          id: realEstate.id,
          name: realEstate.name,
          score: realEstate.score,
          overlay: customOverlay,
        };
      });

      /** 오버레이 표시 */
      for (let i = 0; i < markers.length; i++) {
        clusterer.addMarker(markers[i].overlay);
      }

      /** 마커 표시 */
      for (let i = 0; i < markers.length; i++) {
        const marker = new kakao.maps.Marker({
          map,
          position: markers[i].latlng,
        });

        clusterer.addMarker(marker);
      }

      setDragEnded((prev) => !prev);
    } catch (err) {
      console.error('매물 요청 에러: ', err);
    }
  };

  /** 검색 요청 */
  const requestSearchForMap = async (word: string) => {
    console.log(word, '로 검색 요청');
    try {
      const res = await requestSearch(word);
      console.log('검색 결과', res);

      const resDocument = res.data.documents.map((data: any) => {
        return { address: data.address_name, lng: data.x, lat: data.y };
      });

      setDocument(resDocument);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickRefresh = () => {
    setType('APT');
    setDealType('BUY');
    setPrice([0, 2000000]);
    setGuarantee1([0, 2000000]);
    setGuarantee2([0, 2000000]);
    setMonthly([0, 5000]);
    setExtent([0, 662]);
    setExtent2([0, 200]);
    setFloor([0, 100]);
  };

  /** ================================================= event handler ================================================= */
  /** 지도의 필터 버튼 클릭 시 */
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
    console.log('매물 타입 변경', changedType);
    setType(changedType);
    setShowOption(-1);
  };

  /** 거래 유형 변경 시 */
  const onChangeDealType = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    setDealType(target.value);
  };

  /** 매매가 변경 시 */
  const onChangePrice = (priceRange: number[]) => {
    const newPriceRange = priceRange[0] > 100000 ? [100000, priceRange[1]] : priceRange;
    setPrice(newPriceRange);
  };

  /** 전세 보증금 변경 시 */
  const onChangeGuarantee1 = (guaranteeRange: number[]) => {
    const newGuaranteeRange = guaranteeRange[0] > 100000 ? [100000, guaranteeRange[1]] : guaranteeRange;
    setGuarantee1(newGuaranteeRange);
  };

  /** 월세 보증금 변경 시 */
  const onChangeGuarantee2 = (guaranteeRange: number[]) => {
    const newGuaranteeRange = guaranteeRange[0] > 100000 ? [100000, guaranteeRange[1]] : guaranteeRange;
    setGuarantee2(newGuaranteeRange);
  };

  /** 월세 변경 시 */
  const onChangeMonthly = (monthlyRange: number[]) => {
    const newMonthlyRange = monthlyRange[0] > 300 ? [300, monthlyRange[1]] : monthlyRange;
    setMonthly(newMonthlyRange);
  };

  /** 방 넓이 변경 시 */
  const onChangeExtent = (extentRange: number[]) => {
    const extentMin = extentRange[0] > 199 ? 199 : extentRange[0];
    setExtent([Math.ceil(extentMin * 3.3058), Math.ceil(extentRange[1] * 3.3058)]);
    setExtent2([extentMin, extentRange[1]]);
  };

  /** 층수 변경 시 */
  const onChangeFloor = (floorRange: number[]) => {
    const newFloorRange = [floorRange[0] > 9 ? 9 : floorRange[0], floorRange[1] === 10 ? 100 : floorRange[1]];
    setFloor(newFloorRange);
  };

  /** 검색어 입력 시 */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);

    if (e.target.value) {
      requestSearchForMap(e.target.value);
    } else {
      setDocument([]);
    }
  };

  /** 매물 클릭 시 */
  const onClickRealEstate = (type: string, id: number) => {
    window.open(`../${type}/${id}`);
  };

  return (
    <div className={styles.container}>
      <MapSidebar realEstateList={realEstateList} level={stateLevel} dragEnded={dragEnded} />
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
        {stateLevel <= 4 && (
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
              </div>
            )}
          </div>
        )}
        {stateLevel <= 4 && (
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
              </div>
            )}
          </div>
        )}
        {stateLevel <= 4 && (
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
              <div className={styles['floor-div']}>
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
              </div>
            )}
          </div>
        )}
        <div className={styles['option-item']} onClick={onClickRefresh}>
          <button style={{ padding: '0 10px' }}>필터 초기화</button>
        </div>
      </div>
      <div className={styles.search}>
        <AiOutlineSearch />
        <input type="text" value={searchKeyword} onChange={onChangeSearch} />
      </div>

      {document.length > 0 && (
        <div className={styles['search-result']}>
          <SearchList document={document} setStateCenter={setStateCenter} setSearchClicked={setSearchClicked} setDocument={setDocument} />
        </div>
      )}
      {priority && (
        <>
          <div className={styles['applied-priority']}>
            <AppliedPriority />
          </div>
          <div className={styles.shadow} />
        </>
      )}
      <div ref={mapRef} style={{ width: 'calc(100% - 500px)' }} />
    </div>
  );
}

export default MapContainer;
