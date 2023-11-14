import '../styles/login.scss';
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
      <div className='bigContainer'>
        {/* Lägg till onSubmit på Formik-taggen */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
