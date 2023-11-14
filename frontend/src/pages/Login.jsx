import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useState } from 'react';
import '../styles/login.scss';

const Login = () => {
  const [togglePage, settogglePage] = useState(false);

  return (
    <>
      {togglePage ? <LoginForm /> : <SignUpForm />}
      <div className='button-container'>
        <span
          onClick={() => settogglePage(!togglePage)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {togglePage
            ? 'Not a member yet? Click here to sign up!'
            : 'Click here to login'}
        </span>
      </div>
    </>
  );
};

export default Login;
