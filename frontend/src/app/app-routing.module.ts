import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component'
import { SignupComponent } from './auth/signup/signup.component'
import { StocksComponent } from './stock/stocks/stocks.component';
import { GraphComponent } from './stock/graph/gtaph.component';


const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'graph', component: GraphComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
