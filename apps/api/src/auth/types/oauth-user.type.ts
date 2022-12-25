import { Profile } from 'passport-google-oauth20'

// export class OAuthUsera {
//   id!: string
//   emails?: { value: string }[]
//   provider!: string
//   displayName?: string
//   photos?: { value: string }[]
// }

export type OAuthUser = Pick<
  Profile,
  'id' | 'emails' | 'provider' | 'displayName' | 'photos'
>
