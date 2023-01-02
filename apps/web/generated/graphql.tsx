import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type Announcement = {
  __typename?: 'Announcement'
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  event: Event
  id: Scalars['Float']
  title: Scalars['String']
  type: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type AuthResponse = {
  __typename?: 'AuthResponse'
  accessToken?: Maybe<Scalars['String']>
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type BaseResponse = {
  __typename?: 'BaseResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type CreateAnnouncementInput = {
  description: Scalars['String']
  title: Scalars['String']
  type: Scalars['String']
}

export type CreateAnnouncementResponse = {
  __typename?: 'CreateAnnouncementResponse'
  announcement?: Maybe<Announcement>
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type CreateEventInput = {
  description: Scalars['String']
  endDate?: InputMaybe<Scalars['DateTime']>
  image?: InputMaybe<Scalars['String']>
  location: Scalars['String']
  maximumAttendance?: InputMaybe<Scalars['Int']>
  startDate: Scalars['DateTime']
  title: Scalars['String']
}

export type CreateEventResponse = {
  __typename?: 'CreateEventResponse'
  errMsg?: Maybe<Scalars['String']>
  event: Event
  success: Scalars['Boolean']
}

export type CreateFormKeyInput = {
  label: Scalars['String']
}

export type Event = {
  __typename?: 'Event'
  announcements?: Maybe<Array<Announcement>>
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  endDate?: Maybe<Scalars['DateTime']>
  form: Form
  id: Scalars['String']
  image?: Maybe<Scalars['String']>
  location: Scalars['String']
  maximumAttendance?: Maybe<Scalars['Int']>
  organizers?: Maybe<Array<User>>
  participants?: Maybe<Array<UserParticipateEvent>>
  startDate: Scalars['DateTime']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Form = {
  __typename?: 'Form'
  createdAt: Scalars['DateTime']
  event: Event
  formKeys?: Maybe<Array<FormKey>>
  updatedAt: Scalars['DateTime']
}

export type FormKey = {
  __typename?: 'FormKey'
  form: Form
  formFields?: Maybe<Array<FormValue>>
  id: Scalars['Float']
  label: Scalars['String']
}

export type FormValue = {
  __typename?: 'FormValue'
  formKey: FormKey
  userForm: UserForm
  value: Scalars['String']
}

export type FormValueInput = {
  formKeyId: Scalars['Float']
  value: Scalars['String']
}

export type Liveboard = {
  __typename?: 'Liveboard'
  annoucements?: Maybe<Array<Announcement>>
  event: Event
  participants?: Maybe<Array<UserParticipateEvent>>
}

export type LiveboardResponse = {
  __typename?: 'LiveboardResponse'
  errMsg?: Maybe<Scalars['String']>
  liveboard?: Maybe<Liveboard>
  success: Scalars['Boolean']
}

export type Mutation = {
  __typename?: 'Mutation'
  addOrganizers: UpdateEventResponse
  attendEvent: BaseResponse
  createAnnouncement: CreateAnnouncementResponse
  createEvent: CreateEventResponse
  quitEvent: BaseResponse
  refreshToken: AuthResponse
  removeAnnouncement: BaseResponse
  removeEvent: BaseResponse
  signUpEvent: BaseResponse
  updateAnnouncement: UpdateAnnouncementResponse
  updateEvent: UpdateEventResponse
  updateForm: UpdateFormResponse
}

export type MutationAddOrganizersArgs = {
  eventId: Scalars['String']
  organizerIds: Array<Scalars['String']>
}

export type MutationAttendEventArgs = {
  eventId: Scalars['String']
}

export type MutationCreateAnnouncementArgs = {
  createAnnouncementInput: CreateAnnouncementInput
  eventId: Scalars['String']
}

export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput
}

export type MutationQuitEventArgs = {
  eventId: Scalars['String']
}

export type MutationRemoveAnnouncementArgs = {
  announcementId: Scalars['Float']
  eventId: Scalars['String']
}

export type MutationRemoveEventArgs = {
  eventId: Scalars['String']
}

export type MutationSignUpEventArgs = {
  eventId: Scalars['String']
  formValueInputs: Array<FormValueInput>
}

export type MutationUpdateAnnouncementArgs = {
  eventId: Scalars['String']
  updateAnnouncementInput: UpdateAnnouncementInput
}

export type MutationUpdateEventArgs = {
  eventId: Scalars['String']
  updateEventInput: UpdateEventInput
}

export type MutationUpdateFormArgs = {
  createFormKeyInputs?: InputMaybe<Array<CreateFormKeyInput>>
  eventId: Scalars['String']
  removeFormKeyInputs?: InputMaybe<Array<Scalars['Int']>>
  updateFormKeyInputs?: InputMaybe<Array<UpdateFormKeyInput>>
}

export type Query = {
  __typename?: 'Query'
  getEvent: Event
  getEventsOrganized: Array<Event>
  getEventsParticipated: Array<Event>
  getForm: Form
  getLiveboard: LiveboardResponse
  hello: Scalars['String']
}

export type QueryGetEventArgs = {
  eventId: Scalars['String']
}

export type QueryGetFormArgs = {
  eventId: Scalars['String']
}

export type QueryGetLiveboardArgs = {
  eventId: Scalars['String']
}

export type UpdateAnnouncementInput = {
  description?: InputMaybe<Scalars['String']>
  id: Scalars['Float']
  title?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type UpdateAnnouncementResponse = {
  __typename?: 'UpdateAnnouncementResponse'
  announcement?: Maybe<Announcement>
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type UpdateEventInput = {
  description?: InputMaybe<Scalars['String']>
  endDate?: InputMaybe<Scalars['DateTime']>
  image?: InputMaybe<Scalars['String']>
  location?: InputMaybe<Scalars['String']>
  maximumAttendance?: InputMaybe<Scalars['Int']>
  startDate?: InputMaybe<Scalars['DateTime']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateEventResponse = {
  __typename?: 'UpdateEventResponse'
  errMsg?: Maybe<Scalars['String']>
  event: Event
  success: Scalars['Boolean']
}

export type UpdateFormKeyInput = {
  id: Scalars['Float']
  label?: InputMaybe<Scalars['String']>
}

export type UpdateFormResponse = {
  __typename?: 'UpdateFormResponse'
  errMsg?: Maybe<Scalars['String']>
  form?: Maybe<Form>
  success: Scalars['Boolean']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  eventOrganized?: Maybe<Event>
  eventParticipated?: Maybe<Event>
  id: Scalars['String']
  image?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  refreshToken?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

export type UserForm = {
  __typename?: 'UserForm'
  createdAt: Scalars['DateTime']
  formValues?: Maybe<Array<FormValue>>
  updatedAt: Scalars['DateTime']
  userParticipateEvent: UserParticipateEvent
}

export type UserParticipateEvent = {
  __typename?: 'UserParticipateEvent'
  event: Event
  feedback?: Maybe<Scalars['String']>
  isArrived: Scalars['Boolean']
  rating: Scalars['Float']
  user: User
  userForm: UserForm
}

export type HelloQueryVariables = Exact<{ [key: string]: never }>

export type HelloQuery = { __typename?: 'Query'; hello: string }

export const HelloDocument = gql`
  query Hello {
    hello
  }
`

export function useHelloQuery(
  options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>,
) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({
    query: HelloDocument,
    ...options,
  })
}
