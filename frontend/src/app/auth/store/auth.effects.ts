import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store"
import axios from "axios"
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import * as authInterfaces from "../interfaces"
import * as AuthActions from "./auth.actions"
import * as fromAuth from "./auth.reducers"


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store: Store<fromAuth.State>,
        private route: Router
    ) { }

    @Effect()
    loginFetch: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNIN),
        switchMap((data: { type: string, payload: authInterfaces.signinData }) => {
            return axios({
                method: "post",
                url: "http://localhost:3001/api/auth/login",
                headers: {
                    'Content-Type': 'application/json'
                  },
                data: JSON.stringify(data.payload)
            })
        }),
        map((result: any) => {
            if(result.data.token){
                this.route.navigate(["stocks"])
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("userId", result.data.userId)
                return {
                    type: AuthActions.SIGNIN,
                    payload: result.data
                }
            } else {
                this.route.navigate(["login"])
                return {
                    type: AuthActions.SIGNIN_FAIL,
                    payload: {status: "fail"}
                }
            }
        })
    )

    @Effect()
    signupFetch: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((data: { type: string, payload: authInterfaces.signupData }) => {
            return axios({
                method: "post",
                url: "http://localhost:3001/api/auth/signup",
                headers: {
                    'Content-Type': 'application/json'
                  },
                data: JSON.stringify(data.payload)
            })
        }),
        map((result: any) => {
            this.route.navigate(["login"])

            return {
                type: AuthActions.SIGNUP,
                payload: result.data
            }
        })
    )
}