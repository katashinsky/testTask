import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authReducer from "../../auth/store/auth.reducers";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  login: boolean = true
  
  authState: Observable<authReducer.State>;

  constructor(private store: Store<{auth: authReducer.State}>) { }

  
  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  
  onLogin() {
    this.login = !this.login
  }

}
