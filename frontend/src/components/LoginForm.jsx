import '../styles/login.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';

const LoginForm = () => {
  const { user, setUser } = useContext(Context);
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleOnSubmit = (values) => {
    console.log(values.email, values.password, 'Input values');

    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('/api/login', options).then((res) => {
      res.json().then((data) => {
        setUser(data);
      });
    });
  };

  console.log({ user });

  return (
    <>
      <div className='bigContainer'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  className='Field'
                  type='text'
                  name='email'
                  placeholder='Email'
                ></Field>
                {errors.email && touched.email && (
                  <p className='fieldError'>{errors.email}</p>
                )}
              </div>

              <div>
                <Field
                  className='Field'
                  type='password'
                  name='password'
                  placeholder='Password'
                ></Field>
                {errors.password && touched.password && (
                  <p className='fieldError'>{errors.password}</p>
                )}
              </div>

              <div className='buttonDiv'>
                <button type='submit'>Log in</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
