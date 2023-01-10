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

export enum AnnouncementAction {
  Create = 'CREATE',
  Update = 'UPDATE',
}

export type AnnouncementRemoved = {
  __typename?: 'AnnouncementRemoved'
  announcementId: Scalars['Int']
}

export type AnnouncementUpdated = {
  __typename?: 'AnnouncementUpdated'
  announcement: Announcement
  announcementAction: AnnouncementAction
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
  form?: Maybe<Form>
  id: Scalars['String']
  image?: Maybe<Scalars['String']>
  location: Scalars['String']
  maximumAttendance?: Maybe<Scalars['Int']>
  organizers?: Maybe<Array<User>>
  participants?: Maybe<Array<UserParticipateEvent>>
  participantsCount?: Maybe<Scalars['Int']>
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

export type LiveboardPayload = {
  __typename?: 'LiveboardPayload'
  eventId: Scalars['String']
  payload: Payload
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

export enum ParticipantAction {
  Attend = 'ATTEND',
  Quit = 'QUIT',
}

export type ParticipantUpdated = {
  __typename?: 'ParticipantUpdated'
  participantAction: ParticipantAction
  userId: Scalars['String']
}

export type Payload =
  | AnnouncementRemoved
  | AnnouncementUpdated
  | ParticipantUpdated

export type Query = {
  __typename?: 'Query'
  getEvent: Event
  getEventsOrganized: Array<Event>
  getEventsParticipated: Array<Event>
  getForm: Form
  getLiveboard: LiveboardResponse
  hello: Scalars['String']
  me: User
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

export type Subscription = {
  __typename?: 'Subscription'
  liveboardUpdated: LiveboardPayload
}

export type SubscriptionLiveboardUpdatedArgs = {
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

export type BaseEventFragment = {
  __typename?: 'Event'
  id: string
  title: string
  description: string
  location: string
  startDate: any
  endDate?: any | null
  maximumAttendance?: number | null
  createdAt: any
  updatedAt: any
}

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput
}>

export type CreateEventMutation = {
  __typename?: 'Mutation'
  createEvent: {
    __typename?: 'CreateEventResponse'
    errMsg?: string | null
    success: boolean
    event: {
      __typename?: 'Event'
      id: string
      title: string
      description: string
      location: string
      startDate: any
      endDate?: any | null
      maximumAttendance?: number | null
      createdAt: any
      updatedAt: any
      organizers?: Array<{
        __typename?: 'User'
        id: string
        name?: string | null
      }> | null
      form?: {
        __typename?: 'Form'
        createdAt: any
        updatedAt: any
        formKeys?: Array<{
          __typename?: 'FormKey'
          id: number
          label: string
        }> | null
      } | null
    }
  }
}

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>

export type RefreshTokenMutation = {
  __typename?: 'Mutation'
  refreshToken: {
    __typename?: 'AuthResponse'
    accessToken?: string | null
    errMsg?: string | null
    success: boolean
  }
}

export type GetEventsOrganizedQueryVariables = Exact<{ [key: string]: never }>

export type GetEventsOrganizedQuery = {
  __typename?: 'Query'
  getEventsOrganized: Array<{
    __typename?: 'Event'
    participantsCount?: number | null
    id: string
    title: string
    description: string
    location: string
    startDate: any
    endDate?: any | null
    maximumAttendance?: number | null
    createdAt: any
    updatedAt: any
  }>
}

export type HelloQueryVariables = Exact<{ [key: string]: never }>

export type HelloQuery = { __typename?: 'Query'; hello: string }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me: {
    __typename?: 'User'
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    createdAt: any
    updatedAt: any
  }
}

export const BaseEventFragmentDoc = gql`
  fragment BaseEvent on Event {
    id
    title
    description
    location
    startDate
    endDate
    maximumAttendance
    createdAt
    updatedAt
  }
`
export const CreateEventDocument = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      errMsg
      success
      event {
        ...BaseEvent
        organizers {
          id
          name
        }
        form {
          formKeys {
            id
            label
          }
          createdAt
          updatedAt
        }
      }
    }
  }
  ${BaseEventFragmentDoc}
`

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
  )
}
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      errMsg
      success
    }
  }
`

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
  )
}
export const GetEventsOrganizedDocument = gql`
  query GetEventsOrganized {
    getEventsOrganized {
      ...BaseEvent
      participantsCount
    }
  }
  ${BaseEventFragmentDoc}
`

export function useGetEventsOrganizedQuery(
  options?: Omit<Urql.UseQueryArgs<GetEventsOrganizedQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetEventsOrganizedQuery,
    GetEventsOrganizedQueryVariables
  >({ query: GetEventsOrganizedDocument, ...options })
}
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
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  })
}
