import LoginForm from './LoginForm';
import '../styles/successful.scss';

const SuccessfulSignUp = () => {
  return (
    <>
      <div className='SuccessDiv'>
        <h1>
          You were successfully registered as a user with Pally! You can now
          login below:
        </h1>
        <LoginForm />
      </div>
    </>
  );
};

export default SuccessfulSignUp;
