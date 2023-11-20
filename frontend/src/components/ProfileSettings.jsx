import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useContext } from 'react';
import { Context } from '../contexts/UserContext';
import { Modal } from './modal';
// import '../styles/profile.scss';

const ProfileSettings = () => {
  const [profileUserSettings, setProfileUserSettings] = useState([]);
  const { user, setUser } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  console.log({ user });
  console.log(user.userid, 'useriDDDDDDd');

  // useEffect(() => {
  //   fetch(`/api/profile/${user.userid}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data, 'here is the data');
  //       console.log(data.user);
  //       setProfileUserSetings(data.user);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user:', error);
  //     });
  // }, [user.userid]);

  const removeUser = (userId) => {
    console.log({ userId });
    fetch(`/api/profile/remove/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'here is the data');
        setProfileUserSettings(user);
        setUser('');
      })
      .catch((error) => {
        console.error('Failed to delete user', error);
      });
  };
  const updateUser = (userId, payload) => {
    console.log('usser, ', user);
    console.log('payload', payload);
    fetch(`/api/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          userid: userId,
          userfirstname: payload.firstName,
          userlastname: payload.lastName,
          useremail: payload.email,
          userphonenumber: payload.phone,
          userpersonalnumber: payload.personalNumber,
          userpassword: payload.password,
          userstreet: payload.street,
          usercity: payload.city,
          userimgurl: payload.img,
          userzipcode: payload.zipCode,
        });

        console.log(data);
        // setProfileUserSettings([]);
      })
      .catch((error) => {
        console.error('Failed to update user', error);
      });
  };

  console.log({ profileUserSettings });

  //Formik från SignUpForm
  const initialValueSettings = {
    firstName: user.userfirstname,
    lastName: user.userlastname,
    email: user.useremail,
    personalNumber: user.userpersonalnumber,
    phone: user.userphonenumber,
    street: user.userstreet,
    zipCode: user.userzipcode,
    city: user.usercity,
    img: user.userimgurl,
    password: user.userpassword,
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
      <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
        <p>{"you don't want an account with us anymore? :( buu"}</p>
        <div className='button-container'>
          <button
            onClick={() => {
              removeUser(user.userid);
              setIsOpen(false);
            }}
          >
            Yes
          </button>
          <button onClick={() => setIsOpen(false)}>No</button>
        </div>
      </Modal>
      <div className='bigContainer'>
        <h1>Settings</h1>

        <Formik
          initialValues={initialValueSettings}
          validationSchema={validationSchemaSettings}
          onSubmit={(values) => {
            updateUser(user.userid, values);
          }}
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
                  type='text'
                  name='profile img'
                  placeholder='Profile picture'
                ></Field>
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
                <button
                  className='deleteAccountButton'
                  type='button'
                  onClick={() => setIsOpen(true)}
                >
                  Delete Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProfileSettings;
