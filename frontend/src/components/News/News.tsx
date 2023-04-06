import React, { useEffect, useState } from 'react';
import { http } from '../../api/axios';
import { NewsType } from '../../types/MainType';
import styles from './News.module.scss';

type NewsPropsType = {
  newsList: NewsType[];
};

function News({ newsList }: NewsPropsType) {
  const [page, setPage] = useState(1);
  const pageNewsList = newsList.slice(4 * (page - 1), 4 * page);
  const [showNews, setShowNews] = useState(0);
  const resultList = pageNewsList.slice(0, showNews);

  useEffect(() => {
    setShowNews(0);

    const newsInterval = window.setInterval(() => {
      setShowNews((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(newsInterval);
    };
  }, [page]);

  const onClickSlideBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.name === 'right') {
      setPage(2);
    } else {
      setPage(1);
    }
  };

  const onClickNews = async (id: number, link: string) => {
    window.open(link);

    try {
      const res = await http.get(`api/news/${id}`);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.component}>
      {page > 1 && (
        <button name="left" className={styles['left-btn']} onClick={onClickSlideBtn}>
          {'<'}
        </button>
      )}
      {resultList.map((news, index) => (
        <div
          key={index}
          className={styles.news}
          onClick={() => {
            onClickNews(news.id, news.link);
          }}
        >
          <div className={styles['news-inner']}>
            <p className={styles['news-title']}>{news.title}</p>
            <p className={styles['news-description']}>{news.description}</p>
          </div>
        </div>
      ))}
      {page === 1 && (
        <button name="right" className={styles['right-btn']} onClick={onClickSlideBtn}>
          {'>'}
        </button>
      )}
    </div>
  );
}

export default News;
