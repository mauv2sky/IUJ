import React, { useEffect, useState } from 'react';
import styles from './Notice.module.scss';

export interface NoticeInterface {
  title: string;
  content: string;
  url: string;
}

function Notice({ noticeList }: { noticeList: NoticeInterface[] }) {
  const [page, setPage] = useState(1);
  const pageNoticeList = noticeList.slice(4 * (page - 1), 4 * page);
  const [showNotice, setShowNotice] = useState(0);
  const resultList = pageNoticeList.slice(0, showNotice);

  useEffect(() => {
    setShowNotice(0);

    const noticeInterval = window.setInterval(() => {
      setShowNotice((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(noticeInterval);
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

  const onClickNotice = (url: string) => {
    window.open(url);
  };

  return (
    <div className={styles.component}>
      {page > 1 && (
        <button name="left" className={styles['left-btn']} onClick={onClickSlideBtn}>
          {'<'}
        </button>
      )}
      {resultList.map((notice, index) => (
        <div
          key={index}
          className={styles.notice}
          onClick={() => {
            onClickNotice(notice.url);
          }}
        >
          <div className={styles['notice-inner']}>
            <p className={styles['notice-title']}>{notice.title}</p>
            <p className={styles['notice-content']}>{notice.content}</p>
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

export default Notice;
