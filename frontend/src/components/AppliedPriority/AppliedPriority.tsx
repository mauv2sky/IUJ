import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ResponsedPriorityItemType } from '../../types/MapType';
import { categoryStyle } from '../PriorityCard/PriorityCard';
import styles from './AppliedPriority.module.scss';

function AppliedPriority() {
  const appliedPriority: ResponsedPriorityItemType[] = useAppSelector((state) => state.prioritySlice.appliedPriority);

  return (
    <div className={styles.component}>
      {appliedPriority &&
        appliedPriority.map((item) => (
          <div key={item.sub} className={styles.item}>
            <div className={styles.icon} style={{ color: categoryStyle[item.main].color, border: `1px solid ${categoryStyle[item.main].color}` }}>
              {categoryStyle[item.main].icon}
            </div>
            <p className={styles.sub}>{item.sub}</p>
          </div>
        ))}
    </div>
  );
}

export default AppliedPriority;
