import { DocumentType, MockEndpointType } from '../types'

export function whoamiFixture(): (DocumentType | MockEndpointType)[] {
  const anonymousResponse = {
    accessToken: {
      access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
      token_type: 'bearer',
      expires_in: 286,
      scope: 'default openid',
    },
  }
  const whoamiUrl = 'json/transition/session-who-am-i'
  const loggedinResponse = {
    accessToken: {
      access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
      token_type: 'bearer',
      expires_in: 286,
      scope: 'default openid',
    },
    newLookSessionData: {
      country: 'GB',
      siteId: 'uk',
    },
    customerData: {
      hashedEmail:
        '$argon2id$v=19$m=65536,t=3,p=4$2gFKNfTPfhv21WZ7n9GL6w$XhLWX06wYW0KwdqXg4bOzrhmLHX630zKF73k+CNKJdc',
      firstName: 'Mike',
      lastName: 'Doe',
    },
  }
  return [
    {
      url: whoamiUrl,
      method: 'GET',
      jsonResponse: anonymousResponse,
      httpStatus: 'OK',
    },
    {
      url: whoamiUrl,
      method: 'GET',
      jsonResponse: anonymousResponse,
      headerParams: {
        jsession: 'anonymous.app1-ee2',
      },
      httpStatus: 'OK',
    },
    {
      url: whoamiUrl,
      method: 'GET',
      jsonResponse: loggedinResponse,
      headerParams: {
        jsession: 'loggedin.app1-ee2',
      },
      httpStatus: 'OK',
    },
    {
      url: whoamiUrl,
      method: 'GET',
      jsonResponse: loggedinResponse,
      headerParams: {
        jsession: 'expired.app1-ee2',
      },
      httpStatus: 'GONE',
    },
  ]
}
