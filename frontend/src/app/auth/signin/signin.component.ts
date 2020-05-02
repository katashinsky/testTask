import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from "@ngrx/store"
import { SNACKBAR_DURATION, VALID } from "../../config/constants"
import { SnackBarComponent } from "../../shared/snack-bar/snack-bar.component"
import * as AuthActions from "../store/auth.actions"
import * as fromAuth from "../store/auth.reducers"
import {AppState} from "../../store/app.reducers"
import { Observable } from 'rxjs'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup
  authState: Observable<fromAuth.State>

  hide = true

  constructor(
    private store: Store<AppState>,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.authState = this.store.select("auth")
    this.authState.subscribe(data => {
      if(data.status === "fail") {
        this.store.dispatch(AuthActions.resetStatus({payload: {status: ""}}))
        this.showSnackBar('Login fail')
      }
    })

    this.signinForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
      ]),
      password: new FormControl("", [
        Validators.required
      ]),
    });
  }

  onLogin() {
    if (this.signinForm.status === VALID) {
      this.store.dispatch(AuthActions.trySignin({payload: this.signinForm.value}))
    } else {
      this.showSnackBar('Please try again login')
    }
  }

  showSnackBar(text: string) {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      duration: SNACKBAR_DURATION * 1000,
      verticalPosition: 'top',
      data: text
    })
  }

}
