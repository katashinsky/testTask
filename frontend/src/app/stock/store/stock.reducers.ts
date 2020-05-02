import * as StockActions from './stock.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {FilterData, Stocks} from "../interfaces"

export interface State {
  stocksArr: Array<Stocks>
}

const initialState: State = {
  stocksArr: []
};

const scoreboardReducer = createReducer(
  initialState,
  on(StockActions.filterStoks, (state, action: {type: string, payload: Array<Stocks>}) => {
        console.log("inside Reducer ___ ", action.payload)
        return {stocksArr: action.payload}
  }),
);

export function stockReducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
