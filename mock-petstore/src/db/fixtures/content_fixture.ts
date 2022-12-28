import { homePageJson } from './nl_homepage'
import { DocumentType, MockEndpointType } from './types'

export function contentFixture(): (DocumentType | MockEndpointType)[] {
  return [
    {
      url: 'v1/content/nl_homepage',
      method: 'GET',
      jsonResponse: homePageJson,
      httpStatus: 'OK',
    },
    {
      url: 'v1/content/nl_homepage',
      method: 'GET',
      jsonResponse: {
        error: 'Unauthorised',
      },
      headerParams: {
        'x-test': 'UNAUTHORIZED',
      },
      httpStatus: 'UNAUTHORIZED',
    },
  ]
}
