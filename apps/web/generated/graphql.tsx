import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
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
const defaultOptions = {} as const
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
  averageRating?: Maybe<Scalars['Int']>
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  endDate?: Maybe<Scalars['DateTime']>
  feedbacksCount?: Maybe<Scalars['Int']>
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
  removeAnnouncement: BaseResponse
  removeEvent: BaseResponse
  signOut: Scalars['Boolean']
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
  rating?: Maybe<Scalars['Int']>
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

export type SignOutMutationVariables = Exact<{ [key: string]: never }>

export type SignOutMutation = { __typename?: 'Mutation'; signOut: boolean }

export type GetEventsOrganizedQueryVariables = Exact<{ [key: string]: never }>

export type GetEventsOrganizedQuery = {
  __typename?: 'Query'
  getEventsOrganized: Array<{
    __typename?: 'Event'
    participantsCount?: number | null
    averageRating?: number | null
    feedbacksCount?: number | null
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
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      createEventInput: // value for 'createEventInput'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    options,
  )
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>
export type CreateEventMutationResult =
  Apollo.MutationResult<CreateEventMutation>
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    options,
  )
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>
export const GetEventsOrganizedDocument = gql`
  query GetEventsOrganized {
    getEventsOrganized {
      ...BaseEvent
      participantsCount
      averageRating
      feedbacksCount
    }
  }
  ${BaseEventFragmentDoc}
`

/**
 * __useGetEventsOrganizedQuery__
 *
 * To run a query within a React component, call `useGetEventsOrganizedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsOrganizedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsOrganizedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsOrganizedQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetEventsOrganizedQuery,
    GetEventsOrganizedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetEventsOrganizedQuery,
    GetEventsOrganizedQueryVariables
  >(GetEventsOrganizedDocument, options)
}
export function useGetEventsOrganizedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventsOrganizedQuery,
    GetEventsOrganizedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetEventsOrganizedQuery,
    GetEventsOrganizedQueryVariables
  >(GetEventsOrganizedDocument, options)
}
export type GetEventsOrganizedQueryHookResult = ReturnType<
  typeof useGetEventsOrganizedQuery
>
export type GetEventsOrganizedLazyQueryHookResult = ReturnType<
  typeof useGetEventsOrganizedLazyQuery
>
export type GetEventsOrganizedQueryResult = Apollo.QueryResult<
  GetEventsOrganizedQuery,
  GetEventsOrganizedQueryVariables
>
export const HelloDocument = gql`
  query Hello {
    hello
  }
`

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    options,
  )
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    options,
  )
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>
export type HelloQueryResult = Apollo.QueryResult<
  HelloQuery,
  HelloQueryVariables
>
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
