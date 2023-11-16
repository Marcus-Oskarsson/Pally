import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useState } from 'react';
import '../styles/login.scss';

const Login = () => {
  const [togglePage, settogglePage] = useState(false);

  return (
    <>
      {togglePage ? <SignUpForm /> : <LoginForm />}
      <div className='button-container'>
        <span
          onClick={() => settogglePage(!togglePage)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {togglePage
            ? 'Click here to login'
            : 'Not a member yet? Click here to sign up!'}
        </span>
      </div>
    </>
  );
};

export default Login;
