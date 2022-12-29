import { nl_homepage_en_gb } from './nl_homepage_en_gb'
import { DocumentType, MockEndpointType } from '../types'

export function contentStackFixture(): (DocumentType | MockEndpointType)[] {
  return [
    // v3/content_types/{{content_type_uid}}/entries/{{entry_uid}}
    //  ?version=4&environment={{environment}}&locale={{locale}}
    //  &include_fallback=true&include_branch=false
    {
      url: '/v3/content_types/nl_homepage/entries?environment=',
      method: 'GET',
      jsonResponse: nl_homepage_en_gb,
      httpStatus: 'OK',
    },
    {
      url: '/v3/content_types/nl_homepage',
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
