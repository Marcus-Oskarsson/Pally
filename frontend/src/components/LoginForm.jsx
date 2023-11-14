import '../styles/login.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <>
      <div>
        {/* Lägg till onSubmit på Formik-taggen */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='fieldContainer'>
                <Field
                  className='field'
                  type='text'
                  name='email'
                  placeholder='Email'
                ></Field>
                {errors.email && touched.email && (
                  <p className='fieldError'>{errors.email}</p>
                )}
              </div>

              <div className='fieldContainer'>
                <Field
                  className='field'
                  type='password'
                  name='password'
                  placeholder='Password'
                ></Field>
                {errors.password && touched.password && (
                  <p className='fieldError'>{errors.password}</p>
                )}
              </div>
              <button className='loginButton' type='submit'>
                Log in
              </button>

              <p>
                Not a member yet?{' '}
                <span
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Click here!
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
