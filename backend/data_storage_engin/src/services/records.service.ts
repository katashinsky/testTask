import {IRecords, Records} from "../models/records.model";
import { client } from "../server";

export class RecordsService {
    constructor() {}

    public async saveRecords(records: Array<IRecords>): Promise<string> {
        await Records.insertMany(records)
        return "done"
    }

    public async findByField(field: string, value: any): Promise<IRecords | null> {
        return await Records.findOne({[field]: value})
    }

    public async findByNameAndDate(name: string, dateFrom: number, dateTo: number, hashkey?: string): Promise<Array<IRecords>> {
        let arr = await Records.find({stockName: name, dateMillisecond: {$gt: dateFrom, $lt: dateTo}})
        if(hashkey) client.set(hashkey, JSON.stringify(arr))
      
        return arr
    }
}

export const recordsService = new RecordsService();
