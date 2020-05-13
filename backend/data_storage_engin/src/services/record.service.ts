import {IRecord, Record} from "../models/record.model";
import * as CryptoJS from "crypto-js";
import {SECRET_KEY} from "../config"
import { type } from "os";

type ExtraData = {
    userId: string,
    userPrice: number,
}

export class RecordService {
    constructor() {}

    public async saveRecord(record: any): Promise<IRecord> {
        let extraData: ExtraData = <ExtraData>JSON.parse(CryptoJS.AES.decrypt(record.hashKey, SECRET_KEY).toString(CryptoJS.enc.Utf8))
        let status = parseFloat(record.data.price.high) < extraData.userPrice ? "win" : "lose";
                            
        let fullRecord: IRecord = {...extraData, status, ...record.data}
        let newRecord = new Record(fullRecord)
        return await newRecord.save()
    }

    public async findByNameAndDate(name: string, dateFrom: number, dateTo: number): Promise<Array<IRecord>> {
        let arr = await Record.find({"main.Symbol": name, requestDM: {$gt: dateFrom, $lt: dateTo}})
        return arr
    }
}

export const recordService = new RecordService();
