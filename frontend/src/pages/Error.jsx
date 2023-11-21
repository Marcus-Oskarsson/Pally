import { useState, useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';

import ImageComponent from '../components/ImageComponent';
import '../styles/error.scss';

const TEXTS = [
  '404',
  'Oops!',
  'The page',
  "you're",
  'looking',
  'for',
  "doesn't",
  'exist.',
];

const Error = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index) => index + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='error-page'>
      <div className='error-text-container'>
        <h1 className='error-heading'>404</h1>
        {/* <p className='error-message'>
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p> */}
        <TextTransition className='text' springConfig={presets.molasses}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </div>
      <ImageComponent imageName='not-found' className='error-image' />
    </div>
  );
};

export default Error;
