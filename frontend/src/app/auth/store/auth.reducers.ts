import * as AuthActions from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import * as authInterfaces from "../interfaces"

export interface State {
  authenticated: boolean;
  status: string,
  registerData: authInterfaces.registerResponce
}

const initialState: State = {
  authenticated: false,
  status: "",
  registerData: {
    userId: "testId",
    token: ""
  }
};

const scoreboardReducer = createReducer(
  initialState,
  on(AuthActions.signin, (state, action) => ({ ...state, authenticated: true, status: "success" })),
  on(AuthActions.signFail, (state, action) =>  ({ ...state, status: action.payload.status })),
  on(AuthActions.resetStatus, (state, action) =>  ({ ...state, status: action.payload.status })),
);

export function authReducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
