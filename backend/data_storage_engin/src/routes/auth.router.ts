import * as express from 'express';
import { authController, AuthController } from '../controllers/auth.controller';

class AuthRouter {
  constructor(private router: express.Router, private _authController: AuthController) {
    this.router.route('/login')
      .post(this._authController.login.bind(this._authController));

    this.router.route('/signup')
      .post(this._authController.signup.bind(this._authController));
  }

  get authRouter() {
    return this.router;
  }
}

export const authRouter = new AuthRouter(express.Router(), authController).authRouter;