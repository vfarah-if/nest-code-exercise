export type DocumentType = import('mongoose').Document<any, any, any>

export type MockEndpointType = {
  url: string
  method: string
  jsonResponse: object
  headerParams?: object
  httpStatus: string
}

export type SapUserType = {
  email: string
  password: string
  firstName: string
  lastName: string
  other: any
}
