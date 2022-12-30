import { config } from './config'

describe('config', () => {
  beforeEach(() => {
    require('dotenv').config({
      path: '../../env.test',
    })
  })
  it('should configure defaults', () => {
    expect(config).toMatchSnapshot()
  })
})
