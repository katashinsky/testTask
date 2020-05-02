import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from '@ngrx/store'
import { SNACKBAR_DURATION, VALID } from "../../config/constants"
import { SnackBarComponent } from "../../shared/snack-bar/snack-bar.component"
import * as AuthActions from "../store/auth.actions"
import * as fromAuth from "../store/auth.reducers"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  hide = true
  nameValidator: Array<ValidatorFn> = [
    Validators.required,
  ]

  constructor(
    private store: Store<fromAuth.State>,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl("", [
        ...this.nameValidator
      ]),
      password: new FormControl("", [
        Validators.required,
      ]),
    });
  }

  onSignUp() {
    if (this.signupForm.status === VALID) {
      let { name, password } = this.signupForm.value
      this.store.dispatch(AuthActions.trySignup({ payload: {  name, password } }))
    } else {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        duration: SNACKBAR_DURATION * 1000,
        verticalPosition: 'top',
        data: 'Please try again signup'
      })
    }
  }
}
