import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import * as FeedbackApi from 'lib/api/feedback'

import validationSchema from './validationSchema'

const StyledErrorMessage = props => <ErrorMessage {...props} render={message => <span style={{ fontSize: 12, color: 'red' }}>{message}</span>} />

function Feedback (props) {
  const [isSuccess, setIsSuccess] = useState(false)

  const initialValues = {
    title: '',
    content: '',
  }

  const onSubmit = async (values, actions) => {
    try {
      const response = await FeedbackApi.createFeedback(values)

      if (response.status >= 200 && response.status <= 300) {
        setIsSuccess(true)
        actions.resetForm()
      } else {
        throw new Error(response)
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isValid, isSubmitting }) => {
        return (
          <Form style={{ padding: 20 }}>
            <Field name='title'>
              {({ field }) => (
                <div>
                  <label htmlFor='feedback-title'>標題</label>
                  <br />
                  <input {...field} id='feedback-title' />
                  <StyledErrorMessage name={field.name} />
                </div>
              )}
            </Field>

            <Field name='content'>
              {({ field }) => (
                <div>
                  <label htmlFor='feedback-content'>內容</label>
                  <br />
                  <textarea {...field} id='feedback-content' cols='30' rows='10' />
                  <StyledErrorMessage name={field.name} />
                </div>
              )}
            </Field>

            {isSuccess && <span>客訴成功</span>}

            <hr />

            <button type='submit' disabled={isSubmitting || !isValid}>
              送出
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Feedback
