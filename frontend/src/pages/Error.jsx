import ImageComponent from '../components/ImageComponent';
// import './Error.css';

const Error = () => {
  return (
    <>
      <h1 className='error-heading'>404</h1>
      <p className='error-message'>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <ImageComponent imageName='not-found' className='error-image' />
    </>
  );
};

export default Error;
