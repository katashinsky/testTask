import { NextFunction, Request, Response } from 'express';
import {recordService, RecordService} from "../services/record.service"

export class RecordController {
    constructor(private _recordService: RecordService) {}

    public async getFilteredDate(req: Request, res: Response, next: NextFunction) {
        let {stockName, dateFrom, dateTo} = req.query;
        res.send(await this._recordService.findByNameAndDate( stockName.toString(), parseFloat(dateFrom.toString()), parseFloat(dateTo.toString())))
    }
}

export const recordController = new RecordController(recordService);
