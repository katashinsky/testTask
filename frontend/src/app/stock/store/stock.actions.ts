import { createAction, props } from '@ngrx/store'
import { Action } from '@ngrx/store'
import {FilterData, Stocks} from "../interfaces"

export const TRY_FILTER_STOCK = 'TRY_FILTER_STOCK'
export const FILTER_STOCK = 'FILTER_STOCK'

export const tryFilterStocks = createAction(
    TRY_FILTER_STOCK,
    props<{ payload: FilterData }>()
)

export const filterStoks = createAction(
    FILTER_STOCK,
    props<{ payload: Array<Stocks> }>()
)

