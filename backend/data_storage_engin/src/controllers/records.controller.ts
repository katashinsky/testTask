import { NextFunction, Request, Response } from 'express';
import {recordsService, RecordsService} from "../services/records.service"
import {IRecords} from "../models/records.model";
import { Cashe } from '../decorators/cache';

export class RecordsController {
    constructor(private _recordsService: RecordsService) {}

    public async getRecordInfo(req: Request, res: Response, next: NextFunction) {
        let {stockName} = req.query;
        res.send(await this._recordsService.findByField("stockName", stockName) ? "exist" : "notExist")
    }

    @Cashe
    public async getFilteredDate(req: Request, res: Response, next: NextFunction, hashkey?: string) {
        let {stockName, dateFrom, dateTo} = req.query;
        res.send(await this._recordsService.findByNameAndDate( stockName.toString().split(','), parseFloat(dateFrom.toString()), parseFloat(dateTo.toString()), hashkey))
    }
}

export const recordsController = new RecordsController(recordsService);
