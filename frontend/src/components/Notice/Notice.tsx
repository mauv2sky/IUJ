import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Notice() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index, item) => {
    setSelectedIndex(index);
  };

  return (
    <Carousel selectedItem={selectedIndex} onSelect={handleSelect}>
      <div>
        <img src="image1.jpg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="image2.jpg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="image3.jpg" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}

export default Notice;
