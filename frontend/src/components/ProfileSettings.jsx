import { Formik } from 'formik';
import * as Yup from 'yup';

const ProfileSettings = () => {
  const initialValues = {
    firstName: 'Name',
    lastName: 'Last name',
    email: 'hello@email.com',
    personalNumber: '891114-1234',
    phone: '0733-123456',
    zipCode: '434 89',
    city: 'Gothenburg',
    password: '********',
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
      <div>
        <h1>Settings</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaSettings}
        ></Formik>
      </div>
    </>
  );
};

export default ProfileSettings;
