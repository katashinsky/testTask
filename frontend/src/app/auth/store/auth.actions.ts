import { createAction, props } from '@ngrx/store'
import * as authInterfaces from "../interfaces"

export const TRY_SIGNUP = 'TRY_SIGNUP'
export const SIGNUP = 'SIGNUP'
export const TRY_SIGNIN = 'TRY_SIGNIN'
export const SIGNIN = 'SIGNIN'
export const SIGNIN_FAIL = 'SIGNIN_FAIL'
export const RESET_STATUS = 'RESET_STATUS'

export const trySignin = createAction(
    TRY_SIGNIN,
    props<{ payload: authInterfaces.signinData }>()
)

export const trySignup = createAction(
    TRY_SIGNUP,
    props<{ payload: authInterfaces.signupData }>()
)

export const signin = createAction(
    SIGNIN,
    props<{ payload: authInterfaces.signinData }>()
)

export const signFail = createAction(
    SIGNIN_FAIL,
    props<{ payload: {status: string} }>()
)

export const resetStatus = createAction(
    RESET_STATUS,
    props<{ payload: {status: string} }>()
)

