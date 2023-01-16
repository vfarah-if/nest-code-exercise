import { Injectable } from '@nestjs/common'

import Mockendpoint from '../db/models/Mockendpoint'
import { config } from '../config'

@Injectable()
export class HealthService {
  async getHealthCheck() {
    const doc = await Mockendpoint.findOne({
      url: 'v1/health',
      method: 'GET',
    }).select({
      jsonResponse: 1,
      httpStatus: 1,
    })
    // console.debug(doc)
    return { version: config.version, ...doc['jsonResponse'] }
  }
}
