import { AuthDto } from '../../sap/hybris/auth/dto/auth.dto'
import * as argon from 'argon2'
import SapUser from '../models/SapUser'
import { Types } from 'mongoose'

export async function addSapUser(user: AuthDto) {
  const hash = await argon.hash(user.password)
  const sapUser = new SapUser({
    _id: new Types.ObjectId(),
    email: user.email,
    hash,
    firstName: user.firstName,
    lastName: user.lastName,
    details: user.other,
  })
  await sapUser.save({ validateBeforeSave: true })
  return sapUser
}
