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
  hash: string
  firstName: string
  lastName: string
  details: object
  createdDate: Date
  modifiedDate: Date
}
