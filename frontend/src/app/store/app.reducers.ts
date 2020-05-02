import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromStock from '../stock/store/stock.reducers';

export interface AppState {
  auth: fromAuth.State,
  stock: fromStock.State
}

export const reducers: ActionReducerMap<AppState> = {
// export const reducers: AppState = {
  auth: fromAuth.authReducer,
  stock: fromStock.stockReducer,
};
