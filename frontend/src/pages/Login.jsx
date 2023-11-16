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
          onClick={() => settogglePage(!togglePage)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {togglePage
            ? 'Click here to login'
            : 'Not a member yet? Click here to sign up!'}
        </span>
      </div>
      <div className='buttonDiv'>
        <button onClick={() => setUser('')}>Log out</button>
      </div>
    </>
  );
};

export default Login;
