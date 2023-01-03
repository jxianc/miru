export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(process.env.NEXT_PUBLIC_AT_KEY as string, accessToken)
}

export const getAccessToken = () => {
  return localStorage.getItem(process.env.NEXT_PUBLIC_AT_KEY as string)
}

export const removeAccessToken = () => {
  localStorage.removeItem(process.env.NEXT_PUBLIC_AT_KEY as string)
}
