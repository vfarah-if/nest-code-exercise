import { MockEndpointType } from '../types'

export function healthFixture(): (DocumentType | MockEndpointType)[] {
  return [
    {
      url: 'v1/health',
      method: 'GET',
      jsonResponse: {
        database: 'Healthy',
      },
      httpStatus: 'OK',
    },
  ]
}
