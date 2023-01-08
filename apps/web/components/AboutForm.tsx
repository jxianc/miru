import React from 'react'
import { Formik, Field, Form, FieldProps } from 'formik'
import * as Yup from 'yup'
import { FormField } from './form/FormField'

interface AboutFormProps {
  setCreatedEvent: Function
}

export const AboutForm: React.FC<AboutFormProps> = ({ setCreatedEvent }) => {
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // Data is collected here.
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col justify-center ">
            {/* Form */}
            <div className="flex flex-col gap-10 md:flex-row">
              {/* Left */}
              <div className="flex flex-col w-full gap-10 md:pl-36">
                <div className="relative flex flex-col">
                  <FormField
                    label="Title"
                    name="title"
                    inputType="text"
                    placeholder="Eg. The Night 2023"
                  />
                </div>
                <div className="relative flex flex-col flex-1">
                  <FormField
                    label="Description"
                    name="description"
                    inputType="text"
                    as="textarea"
                    placeholder="Eg. The purpose of the event..."
                  />
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col w-full gap-10 md:pr-36 ">
                <div className="relative flex flex-col">
                  <FormField
                    label="Location"
                    name="location"
                    inputType="text"
                    placeholder="Eg. Bascom Hill, room 18"
                  />
                </div>

                <div className="relative flex flex-col">
                  <FormField label="Date" name="date" inputType="date" />
                </div>

                <div className="relative flex flex-col">
                  <FormField label="Time" name="time" inputType="time" />
                </div>

                {/* TODO: make this radio input reusable for the future */}
                <div className="relative flex flex-col md:min-h-[125px]">
                  <p className="mb-1 whitespace-nowrap">Maximum Attendance</p>
                  <Field name="maxAttendance" className="rounded-md">
                    {({ field }: FieldProps<any>) => (
                      <>
                        <div className="radio-item">
                          <input
                            {...field}
                            id="none"
                            value="none"
                            checked={field.value === 'none'}
                            type="radio"
                          />
                          <label htmlFor="none" className="ml-2">
                            None
                          </label>
                        </div>

                        <div className="radio-item">
                          <input
                            {...field}
                            id="yes"
                            value="yes"
                            checked={field.value === 'yes'}
                            type="radio"
                          />
                          <label htmlFor="yes" className="ml-2">
                            Yes
                          </label>
                        </div>
                      </>
                    )}
                  </Field>
                  {values.maxAttendance === 'yes' && (
                    <Field
                      name="max"
                      type="number"
                      className="w-full mt-1 rounded-md placeholder-slate-400"
                      placeholder="Eg. 1"
                    />
                  )}
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
