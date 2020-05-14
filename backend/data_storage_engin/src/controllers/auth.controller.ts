import { NextFunction, Request, Response } from 'express';
import {authService, AuthService} from "../services/auth.service"
import {userService, UserService} from "../services/users.service"

export class AuthController {
  constructor(private _authService: AuthService, private _userService: UserService) {}

  public async login(req: Request, res: Response, next: NextFunction) {
      let {name, password} = req.body;
      console.log(JSON.stringify({name, password}))
      res.send(await this._authService.login(name, password))
  }

  public async signup(req: Request, res: Response, next: NextFunction) {
    let {name, password} = req.body;
    res.send(await this._authService.signup(name, password))
  }
}

export const authController = new AuthController(authService, userService);
