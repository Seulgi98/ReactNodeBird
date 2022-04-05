import React, {useState} from 'react';
import PropTypes from "prop-types";
import Slick from "react-slick"
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

const CloseBtn = styled.button`

`;

const ImagesZoom = ({images, onClose}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div>
      <Slick
        initialSlide={0}
        afterChange={(slide) => setCurrentSlide(slide)}
        infinite
        arrows={false} //화살표 지우기(손으로만 넘김)
        slidesToShow={1}
        slidesToScroll={1}
      >
        {images.map((v) => (
          <div key={v.src}>
            <img src={v.src} alt={v.src}/>
          </div>
        ))}
      </Slick>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;
