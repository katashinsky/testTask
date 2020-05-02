import { Injectable } from "@angular/core"
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store"
import * as StockActions from "./stock.actions"
import * as fromStock from "../store/stock.reducers"
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import {FilterData, Stocks} from "../interfaces"
import axios from "axios"
import {AppState} from "../../store/app.reducers"



@Injectable()
export class StocksEffects {

    constructor(
        private actions$: Actions,
        private store: Store<AppState>
    ) { }

    @Effect()
    stocksDataFetch: Observable<any> = this.actions$.pipe(
        ofType(StockActions.TRY_FILTER_STOCK),
        switchMap((data: { type: string, payload: FilterData }) => {
            let {dateFrom, dateTo, stockName} = data.payload
            console.log("Here ___ try this ____ ", {dateFrom, dateTo, stockName})
            return axios({
                method: "get",
                url: `http://localhost:3001/api/records/filter?stockName=${stockName}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
                headers: {
                    'auth': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                  },
                data: JSON.stringify(data.payload)
            })
        }),
        map((result: any) => {
            console.log("action effect ", result)
            return {
                type: StockActions.FILTER_STOCK,
                payload: result.data
            }
        })
    )
}