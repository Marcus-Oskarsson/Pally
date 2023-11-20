import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../styles/event.scss';

const NewEvent = () => {
  const [submitted, setSubmitted] = useState(false);

  const initialValueSettings = {
    eventName: '',
    eventStreet: '',
    eventEmail: '',
    eventDate: '',
    eventImage: null,
  };

  const validationSchemaSettings = Yup.object().shape({
    eventName: Yup.string().required('Name is required'),
    eventStreet: Yup.string().required('Street is required'),
    eventEmail: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    eventDate: Yup.string().required('Date is required'),
  });

  // Submitta nytt event-metod via Formik
  const submitEvent = async (values, { setSubmitting }) => {
    console.log('values:', values);
    try {
      const formData = new FormData();
      formData.append('eventName', values.eventName);
      formData.append('eventStreet', values.eventStreet);
      formData.append('eventEmail', values.eventEmail);
      formData.append('eventDate', values.eventDate);
      formData.append('eventImage', values.eventImage);

      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      console.log('Response:', response);

      if (response.ok) {
        setSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit event');
      }
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='input-container'>
        <h3>New Event</h3>
        <Formik
          initialValues={initialValueSettings}
          validationSchema={validationSchemaSettings}
          onSubmit={submitEvent}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form encType='multipart/form-data'>
              {!submitted ? (
                <>
                  <div>
                    <Field
                      className='Field'
                      type='text'
                      name='eventName'
                      placeholder='Event Name *'
                    ></Field>
                    {errors.eventName && touched.eventName && (
                      <p className='fieldError'>{errors.eventName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type='file'
                      className='form-control-file'
                      name='eventImage'
                      multiple={false}
                      onChange={(event) => {
                        setFieldValue(
                          'eventImage',
                          event.currentTarget.files[0]
                        );
                      }}
                    ></input>
                    {errors.eventImage && touched.eventImage && (
                      <p className='fieldError'>{errors.eventImage}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      className='Field'
                      type='text'
                      name='eventStreet'
                      placeholder='Event Street *'
                    ></Field>
                    {errors.eventStreet && touched.eventStreet && (
                      <p className='fieldError'>{errors.eventStreet}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      className='Field'
                      type='text'
                      name='eventEmail'
                      placeholder='Event Email *'
                    ></Field>
                    {errors.eventEmail && touched.eventEmail && (
                      <p className='fieldError'>{errors.eventEmail}</p>
                    )}
                  </div>
                  <div>
                    <Field
                      className='Field'
                      type='text'
                      name='eventDate'
                      placeholder='Event Date * (YYYY-MM-DD)'
                    ></Field>
                    {errors.eventDate && touched.eventDate && (
                      <p className='fieldError'>{errors.eventDate}</p>
                    )}
                  </div>
                  <div className='btn-container'>
                    <button type='submit'>Submit Event</button>
                  </div>
                </>
              ) : (
                <div className='event-successful'>
                  <h3>Event submitted! 👍</h3>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewEvent;
