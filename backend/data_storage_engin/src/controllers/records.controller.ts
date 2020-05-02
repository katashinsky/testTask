import { NextFunction, Request, Response } from 'express';
import {recordsService, RecordsService} from "../services/records.service"
import {IRecords} from "../models/records.model";

export class RecordsController {
    constructor(private _recordsService: RecordsService) {}

    public async getRecordInfo(req: Request, res: Response, next: NextFunction) {
        let {stockName} = req.query;
        res.send(await this._recordsService.findByField("stockName", stockName) ? "exist" : "notExist")
    }

    public async getFilteredDate(req: Request, res: Response, next: NextFunction) {
        let {stockName, dateFrom, dateTo} = req.query;
        console.log(stockName, dateFrom, dateTo)
        res.send(await this._recordsService.findByNameAndDate( stockName.toString(), parseFloat(dateFrom.toString()), parseFloat(dateTo.toString())))
    }
}

export const recordsController = new RecordsController(recordsService);
