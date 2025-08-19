export interface ILogin {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  refreshToken: string
  email: string
  userName: string
  role: string
  expiration: number
  idUser: string
}
