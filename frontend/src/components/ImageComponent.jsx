import { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const ImageComponent = ({ imageName, height, width }) => {
  // const [image1x, setImage1x] = useState(null);
  // const [image2x, setImage2x] = useState(null);
  // const [image3x, setImage3x] = useState(null);
  // const [image4x, setImage4x] = useState(null);
  const [images, setImages] = useState({
    image1x: null,
    image2x: null,
    image3x: null,
    image4x: null,
  });

  useEffect(() => {
    const fetchImages = async () => {
      setImages({
        image1x: (await import(`../assets/images/1/${imageName}-1x.png`))
          .default,
        image2x: (await import(`../assets/images/2/${imageName}-2x.png`))
          .default,
        image3x: (await import(`../assets/images/3/${imageName}-3x.png`))
          .default,
        image4x: (await import(`../assets/images/4/${imageName}-4x.png`))
          .default,
      });
    };
    // const fetchImages = async () => {
    //   setImage1x(
    //     (await import(`../assets/images/1/${imageName}-1x.png`)).default
    //   );
    //   setImage2x(
    //     (await import(`../assets/images/2/${imageName}-2x.png`)).default
    //   );
    //   setImage3x(
    //     (await import(`../assets/images/3/${imageName}-3x.png`)).default
    //   );
    //   setImage4x(
    //     (await import(`../assets/images/4/${imageName}-4x.png`)).default
    //   );
    // };
    fetchImages();
  }, [imageName]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <picture>
        <source
          srcSet={`${images.image1x}, ${images.image2x} 2x, ${images.image3x} 3x, ${images.image4x} 4x`}
        />
        <img
          src={images.image1x}
          width={width}
          height={height}
          alt={imageName}
        />
      </picture>
    </Suspense>
  );
};

ImageComponent.propTypes = {
  imageName: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default ImageComponent;
