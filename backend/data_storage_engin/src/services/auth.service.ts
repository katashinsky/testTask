
import {User, IUser} from "../models/user.model"
import {userService, UserService} from "../services/users.service"


export class AuthService {
  constructor(private _userService: UserService) { }

  public async login(name: string, password: string): Promise<string | { token: string, userId: string }> {
    console.log(name, password)
    let user = await this._userService.findByField("name", name)
    if(!user) return "Please signup"
    if(user.password !== password) return "Wrong password please try again"

    return {token: user.token, userId: user._id}
  }

  public async signup(name: string, password: string): Promise<IUser | string> {
    let user = await this._userService.findByField("name", name);
    if(user) return "User already exist"

    return await this._userService.saveUser(name, password)
  }
}

export const authService = new AuthService(userService);
