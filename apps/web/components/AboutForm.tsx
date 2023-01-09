import React from 'react'
import { Formik, Field, Form, FieldProps } from 'formik'
import * as Yup from 'yup'
import { FormField } from './form/FormField'
import { useCreateEventMutation } from '../generated/graphql'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

interface AboutFormProps {
  setCreatedEvent: Function
}

export const AboutForm: React.FC<AboutFormProps> = ({ setCreatedEvent }) => {
  const [_data, createEvent] = useCreateEventMutation()
  const router = useRouter()

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
        onSubmit={async ({
          title,
          description,
          location,
          max,
          maxAttendance,
          date,
          time,
        }) => {
          const startDate = new Date(date + 'T' + time).toISOString()
          const { data, error } = await createEvent({
            createEventInput: {
              title,
              description,
              location,
              maximumAttendance: maxAttendance ? max : undefined,
              startDate,
            },
          })

          if (error || (data && !data.createEvent.success)) {
            // failed to create event
            // TODO: add button to let user to try again (refresh?)
            toast.error('Failed to create event')
          }

          if (data?.createEvent.success) {
            // create event successfully
            toast.success('Event is created successfully')
            router.push('/manage')
          }
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
