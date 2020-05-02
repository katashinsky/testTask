import {User, IUser} from "../models/user.model"
import {v4} from 'uuid'

export class UserService {
  constructor() {}

  public async findByField(field: string, value: any): Promise<IUser | null> {
    return await User.findOne({[field]: value})
  }

  public async saveUser(name: string, password: string): Promise<IUser> {
    let user = new User({name, password, token: v4()})
    return await user.save()
  }
}

export const userService = new UserService();
