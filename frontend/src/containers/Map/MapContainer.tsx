import React from 'react';
import MapSidebar from '../../components/MapSidebar/MapSidebar';
import styles from './MapContainer.module.scss';

function MapContainer() {
  return (
    <div className={styles.container}>
      <MapSidebar />
      <div>
        <p>MapContent</p>
      </div>
    </div>
  );
}

export default MapContainer;
