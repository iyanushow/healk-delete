import React, { useState } from 'react';
import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from './Loader';

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const validationSchema = Yup.object().shape({
  reason: Yup.string(),
  email: Yup.string()
});

export default function App() {
  const initialValues = {
    email: '',
    reason: ''
  };

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>();

  const { handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async formValues => {
      console.log('TRYING TO SUBMIT', formValues);
      setSubmitting(true);
      try {
        const res = await axios.post<unknown, { data: { status: boolean } }>(
          `${process.env.API_URL}/user/delete-request`,
          formValues
        );
        console.log(res.data, 'FORM RESPONSE');
        setSuccess(!!res.data.status);

        setSubmitting(false);
      } catch (error) {
        setSuccess(false);
        setSubmitting(false);
        console.error('Error submitting form', error);
      }
    }
  });

  return (
    <>
      <Loader
        isActive={submitting}
        onClose={() => console.log('Loading finished')}
      />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-screen-xl flex items-center justify-center ">
          <svg
            className="h-10"
            aria-hidden="true"
            viewBox="0 0 40 24"
            fill="none">
            <path
              d="M18.724 1.714c-4.538 0-7.376 2.286-8.51 6.857 1.702-2.285 3.687-3.143 5.957-2.57 1.296.325 2.22 1.271 3.245 2.318 1.668 1.706 3.6 3.681 7.819 3.681 4.539 0 7.376-2.286 8.51-6.857-1.701 2.286-3.687 3.143-5.957 2.571-1.294-.325-2.22-1.272-3.245-2.32-1.668-1.705-3.6-3.68-7.819-3.68zM10.214 12c-4.539 0-7.376 2.286-8.51 6.857 1.701-2.286 3.687-3.143 5.957-2.571 1.294.325 2.22 1.272 3.245 2.32 1.668 1.705 3.6 3.68 7.818 3.68 4.54 0 7.377-2.286 8.511-6.857-1.702 2.286-3.688 3.143-5.957 2.571-1.295-.326-2.22-1.272-3.245-2.32-1.669-1.705-3.6-3.68-7.82-3.68z"
              className="fill-sky-400"></path>
          </svg>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 gap-5">
            HealKitchen Account Deletion Form
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {success !== undefined && (
            <div className="h-[54px]">
              {success && (
                <div>
                  <h2 className="text-green-700 text-lg font-semibold uppercase mb-1.5">
                    Account Successfully deleted
                  </h2>

                  <h2 className="text-sm">
                    Please check email for confirmation
                  </h2>
                </div>
              )}

              {success === false && (
                <div>
                  <h2 className="text-red-500 text-lg font-semibold uppercase mb-1.5">
                    Error deleting account.
                  </h2>

                  <p className="text-sm">
                    Please contact support{' '}
                    <a
                      className="text-red-500"
                      href="mailto://iyanuofficial@gmail.com">
                      iyanuofficial@gmail.com
                    </a>{' '}
                  </p>
                </div>
              )}
            </div>
          )}

          <form
            action="#"
            method="POST"
            className="space-y-4 mt-5"
            onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900">
                Password{' '}
              </label>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Reason
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  rows={5}
                  id="reason"
                  name="reason"
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <p className="text-sm mb-3">
                If you can't remember your password, well send a comfirmation
                email
              </p>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
