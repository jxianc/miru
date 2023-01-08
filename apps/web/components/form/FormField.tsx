import { ErrorMessage, Field, FieldProps } from 'formik'
import React, { HTMLInputTypeAttribute } from 'react'
import { cn } from '../../libs/classname'

interface FormFieldProps {
  label: string
  name: string
  inputType: HTMLInputTypeAttribute
  as?: string | React.ComponentType<FieldProps['field']>
  placeholder?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  inputType,
  placeholder,
  as,
}) => {
  return (
    <>
      <p className="mb-1">{label}</p>
      <Field
        name={name}
        type={inputType}
        placeholder={placeholder}
        as={as}
        className={cn(
          as == 'textarea' ? 'min-h-[200px] md:flex-grow' : '',
          'rounded-md placeholder-slate-400',
        )}
      />
      <ErrorMessage
        component="span"
        name={name}
        className="absolute bottom-0 left-0 text-red-500 whitespace-nowrap translate-y-7"
      />
    </>
  )
}
