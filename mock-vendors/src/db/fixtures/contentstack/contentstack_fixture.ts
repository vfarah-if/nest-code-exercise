import { nl_homepage_en_gb } from './nl_homepage_en_gb'
import { nl_homepage_en_us } from './nl_homepage_en_us'
import { DocumentType, MockEndpointType } from '../types'
import { config } from '../../../config'

export function contentStackFixture(): (DocumentType | MockEndpointType)[] {
  return [
    // https://{{base_url}}/v3/content_types/{{content_type_uid}}/entries
    //  ?locale={{locale}}&include_fallback=true&include_branch=false&environment={{environment}}
    // TODO: Variations on all teh available test options with other values
    {
      url: `v3/content_types/nl_homepage/entries`,
      method: 'GET',
      jsonResponse: nl_homepage_en_gb,
      httpStatus: 'OK',
    },
    {
      url: `v3/content_types/nl_homepage/entries?locale=en-gb&include_fallback=true&include_branch=false&environment=${config.contentStackDeliveryApi.environment}`,
      method: 'GET',
      jsonResponse: nl_homepage_en_gb,
      httpStatus: 'OK',
    },
    {
      url: `v3/content_types/nl_homepage/entries?locale=en-gb&include_fallback=false&include_branch=true&environment=${config.contentStackDeliveryApi.environment}`,
      method: 'GET',
      jsonResponse: nl_homepage_en_gb,
      httpStatus: 'OK',
    },
    {
      url: `v3/content_types/nl_homepage/entries?locale=en-gb&include_fallback=false&include_branch=false&environment=${config.contentStackDeliveryApi.environment}`,
      method: 'GET',
      jsonResponse: nl_homepage_en_gb,
      httpStatus: 'OK',
    },
    {
      url: `v3/content_types/nl_homepage/entries?locale=en-gb&include_fallback=true&include_branch=true&environment=${config.contentStackDeliveryApi.environment}`,
      method: 'GET',
      jsonResponse: nl_homepage_en_gb,
      httpStatus: 'OK',
    },
    {
      url: `v3/content_types/nl_homepage/entries?locale=en-us&include_fallback=true&include_branch=false&environment=${config.contentStackDeliveryApi.environment}`,
      method: 'GET',
      jsonResponse: nl_homepage_en_us,
      httpStatus: 'OK',
    },
    {
      url: 'v3/content_types/nl_homepage/entries?locale=en-gb&include_fallback=true&include_branch=false&environment=dev-sandbox',
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
