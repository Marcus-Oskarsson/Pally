import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import SuccessfulSignUp from './SuccessfulSignUp';

const SignUpForm = () => {
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    personalNumber: '',
    phone: '',
    street: '',
    zipCode: '',
    city: '',
    password: '',
    privacy: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    personalNumber: Yup.string()
      .matches(/^[0-9]{12}$/, 'Invalid personal number')
      .required('Personal number is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid phone number')
      .required('Phone number is required'),
    street: Yup.string().required('Street is required'),
    zipCode: Yup.string()
      .matches(/^[0-9]{5}$/, 'Invalid zip code')
      .required('Zip code is required'),
    city: Yup.string().required('City is required'),
    password: Yup.string().required('Password is required'),
    privacy: Yup.bool().oneOf(
      [true],
      'You need to accept the terms and conditions'
    ),
  });

  const handleNewUser = (values) => {
    console.log(values, 'Input values');

    const options = {
      method: 'POST',
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        personalNumber: values.personalNumber,
        password: values.password,
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('/api/signup', options).then((res) => {
      res.json().then((data) => {
        console.log(data, 'New user added');
        setIsPostSuccess(true);
        console.log(isPostSuccess, 'Is post success?');
      });
    });
  };

  return (
    <>
      {!isPostSuccess && (
        <div className='bigContainer'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleNewUser}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <label htmlFor='firstName'>First name</label>
                  <Field
                    className='Field'
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                  ></Field>
                  {errors.firstName && touched.firstName && (
                    <p className='fieldError'>{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Field
                    className='Field'
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                  ></Field>
                  {errors.lastName && touched.lastName && (
                    <p className='fieldError'>{errors.lastName}</p>
                  )}
                </div>

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
                    type='text'
                    name='personalNumber'
                    placeholder='YYYYMMDDXXXX'
                  ></Field>
                  {errors.personalNumber && touched.personalNumber && (
                    <p className='fieldError'>{errors.personalNumber}</p>
                  )}
                </div>

                <div>
                  <Field
                    className='Field'
                    type='tel'
                    name='phone'
                    placeholder='Phone Number'
                  ></Field>
                  {errors.phone && touched.phone && (
                    <p className='fieldError'>{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Field
                    className='Field'
                    type='text'
                    name='street'
                    placeholder='Street'
                  ></Field>
                  {errors.street && touched.street && (
                    <p className='fieldError'>{errors.street}</p>
                  )}
                </div>

                <div>
                  <Field
                    className='Field'
                    type='text'
                    name='zipCode'
                    placeholder='Zip Code'
                  ></Field>
                  {errors.zipCode && touched.zipCode && (
                    <p className='fieldError'>{errors.zipCode}</p>
                  )}
                </div>

                <div>
                  <Field
                    className='Field'
                    type='text'
                    name='city'
                    placeholder='City'
                  ></Field>
                  {errors.city && touched.city && (
                    <p className='fieldError'>{errors.city}</p>
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

                <div>
                  <label htmlFor='privacy'>
                    <Field type='checkbox' name='privacy' />
                    By checking this box, you consent to the storage and
                    processing of your information in accordance with our
                    privacy policy and GDPR guidelines.
                    {errors.privacy && touched.privacy && (
                      <p className='fieldError'>{errors.privacy}</p>
                    )}
                  </label>
                </div>

                <div className='buttonDiv'>
                  <button className='signUpButton' type='submit'>
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {isPostSuccess && <SuccessfulSignUp />}
    </>
  );
};

export default SignUpForm;
