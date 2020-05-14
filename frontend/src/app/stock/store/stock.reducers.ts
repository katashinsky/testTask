import * as StockActions from './stock.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {FilterData, Stocks, StocksData} from "../interfaces"

export interface State {
  data: StocksData
}

const initialState: State = {
  data: {
    FB: [],
    AAPL: [],
    IBM: [],
    AMZN: [],
    DIS: [],
  }
};

const scoreboardReducer = createReducer(
  initialState,
  on(StockActions.filterStoks, (state, action: {type: string, payload: StocksData}) => {
      console.log("Records reducer __ ", action.payload)
      return {data: action.payload}
  }),
);

export function stockReducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
