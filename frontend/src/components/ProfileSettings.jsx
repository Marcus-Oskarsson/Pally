import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// import '../styles/profile.scss';

const ProfileSettings = () => {
  const [profileUserSettings, setProfileUserSetings] = useState([]);

  useEffect(() => {
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'here is the data');
        console.log(data[0].user);
        //gets first user
        setProfileUserSetings(data[0]);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);
  //Formik från SignUpForm
  const initialValueSettings = {
    firstName: '',
    lastName: '',
    email: '',
    personalNumber: '',
    phone: '',
    street: '',
    zipCode: '',
    city: '',
    password: '',
  };

  const validationSchemaSettings = Yup.object().shape({
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
  });

  return (
    <>
      <div key={profileUserSettings.userid}>
        <ul>
          <li>First name: {profileUserSettings.userfirstname}</li>
          <li>Last name: {profileUserSettings.userlastname}</li>
          <li>Email: {profileUserSettings.useremail}</li>
          <li>Phone: {profileUserSettings.userphonenumber}</li>
          <li>Street: {profileUserSettings.userstreet}</li>
          <li>Zip code: {profileUserSettings.userzipcode}</li>
          <li>City: {profileUserSettings.usercity}</li>
          <li>Password: {profileUserSettings.userPassword}</li>
        </ul>
      </div>
      <div className='bigContainer'>
        <h1>Settings</h1>

        <Formik
          initialValues={initialValueSettings}
          validationSchema={validationSchemaSettings}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
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

              <div className='buttonDiv'>
                <button className='changeSettingsButton' type='submit'>
                  Uppdate settings
                </button>
                <button className='deleteAccountButton' type='submit'>
                  Delete Account
                </button>
              </div>
              <div className='buttonDiv'>
                <button className='logOutButton'>Log out</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProfileSettings;
