import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import '../styles/login.scss';

const Login = () => {
  const [togglePage, settogglePage] = useState(false);
  const { user, setUser } = useContext(Context);
  console.log(user, 'User');

  return (
    <>
      {togglePage ? <SignUpForm /> : <LoginForm />}
      <div className='button-container'>
        <span
          className='loginText'
          onClick={() => settogglePage(!togglePage)}
          style={{
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
          }}
        >
          {togglePage
            ? 'Already have an account? Click here to login!'
            : 'Not a member yet? Click here to sign up!'}
        </span>
      </div>
    </>
  );
};

export default Login;
