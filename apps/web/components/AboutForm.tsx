import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAtom } from 'jotai'
import { setNavbarStatusAtom, NavbarState } from '../libs/atom/navbar.atom'

interface AboutFormProps {
  setCreatedEvent: Function
}

export const AboutForm: React.FC<AboutFormProps> = ({ setCreatedEvent }) => {
  const [navbarStatus, setNavbarStatus] =
    useAtom<NavbarState>(setNavbarStatusAtom)

  return (
    <div>
      <h1 className="py-10 text-3xl text-center">About my event...</h1>
      <Formik
        initialValues={{
          // max indicate the max number of participants only if the maxAttendance is "yes" ( A limit is set ).
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          maxAttendance: 'none',
          max: 0,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Event title is required.'),
          description: Yup.string().required('Event description is required.'),
          location: Yup.string().required('Event location is required.'),
          date: Yup.date().required('Event date is required.'),
          time: Yup.string().required('Event time is required.'),
          maxAttendance: Yup.string().required('This field is required.'),
          max: Yup.number(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // Data is collected here.
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
          <Form className="flex flex-col justify-center ">
            {/* Form */}
            <div className="flex flex-col gap-10 md:flex-row">
              {/* Left */}
              <div className="flex flex-col w-full gap-10 md:pl-36">
                <div className="relative flex flex-col flex-2">
                  <p className="mb-1">Title</p>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Eg. The Night 2023"
                    className="rounded-md placeholder-slate-400"
                  />
                  <ErrorMessage
                    component="span"
                    name="title"
                    className="absolute bottom-0 left-0 text-red-500 translate-y-7"
                  />
                </div>
                <div className="relative flex flex-col flex-1 ">
                  <div className="flex flex-col flex-grow">
                    <p className="mb-1">Description</p>
                    <Field
                      name="description"
                      type="text"
                      as="textarea"
                      className="min-h-[200px] md:flex-grow rounded-md placeholder-slate-400"
                      placeholder="Eg. The purpose of the event..."
                    />
                  </div>
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="absolute bottom-0 left-0 text-red-500 translate-y-7"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col w-full gap-10 md:pr-36 ">
                <div className="relative flex flex-col">
                  <p className="mb-1">Location</p>
                  <Field
                    name="location"
                    type="text"
                    placeholder="Eg. Bascom Hill, room 18"
                    className="w-full rounded-md placeholder-slate-400"
                  />
                  <ErrorMessage
                    component="span"
                    name="location"
                    className="absolute bottom-0 left-0 text-red-500 translate-y-7"
                  />
                </div>

                <div className="relative flex flex-col">
                  <p className="mb-1">Date</p>
                  <Field
                    name="date"
                    type="date"
                    className="w-full rounded-md"
                  />
                  <ErrorMessage
                    component="span"
                    name="date"
                    className="absolute bottom-0 left-0 text-red-500 translate-y-7"
                  />
                </div>

                <div className="relative flex flex-col">
                  <p className="mb-1">Time</p>
                  <Field
                    name="time"
                    type="time"
                    className="w-full rounded-md"
                  />
                  <ErrorMessage
                    component="span"
                    name="time"
                    className="absolute bottom-0 left-0 text-red-500 translate-y-7"
                  />
                </div>

                <div className="relative flex flex-col md:min-h-[125px]">
                  <p className="mb-1">Maximum Attendance</p>

                  <Field
                    name="maxAttendance"
                    className="rounded-md"
                    render={({ field }) => (
                      <>
                        <div className="radio-item">
                          <input
                            {...field}
                            id="male"
                            value="none"
                            checked={field.value === 'none'}
                            type="radio"
                          />
                          <label htmlFor="male" className="ml-2">
                            None
                          </label>
                        </div>

                        <div className="radio-item">
                          <input
                            {...field}
                            id="female"
                            value="yes"
                            checked={field.value === 'yes'}
                            type="radio"
                          />
                          <label htmlFor="female" className="ml-2">
                            Yes
                          </label>
                        </div>
                      </>
                    )}
                  />
                  {values.maxAttendance === 'yes' && (
                    <Field
                      name="max"
                      type="number"
                      className="w-full mt-1 rounded-md placeholder-slate-400"
                      placeholder="Eg. 1"
                    />
                  )}
                  <ErrorMessage name="firstName" />
                </div>
              </div>
            </div>
            {/* Button */}
            <div className="flex items-center justify-center gap-10 pb-5 md:pb-0 mt-7">
              <button
                type="reset"
                onClick={() => setCreatedEvent(null)}
                className="min-w-[100px] p-3 duration-200 ease-in-out border border-black rounded-xl hover:bg-black hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                className="min-w-[100px]  p-3 duration-200 ease-in-out border border-black rounded-xl hover:bg-black hover:text-white"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
