import { MockEndpointType } from '../../types'

export function whoamiFixture(): MockEndpointType[] {
  const anonymousResponse = {
    isSignedIn: false,
    accessToken: {
      access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
      token_type: 'bearer',
      expires_in: 286,
      scope: 'default openid',
    },
  }
  const whoamiUrl = 'json/transition/session-who-am-i'
  const loggedinResponse = {
    isSignedIn: true,
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
        JSESSION: 'anonymous.app1-ee2',
      },
      httpStatus: 'OK',
    },
    {
      url: whoamiUrl,
      method: 'GET',
      jsonResponse: loggedinResponse,
      headerParams: {
        JSESSION: 'loggedin.app1-ee2',
      },
      httpStatus: 'OK',
    },
    {
      url: whoamiUrl,
      method: 'GET',
      jsonResponse: loggedinResponse,
      headerParams: {
        JSESSION: 'expired.app1-ee2',
      },
      httpStatus: 'GONE',
    },
  ]
}
