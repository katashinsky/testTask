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

    public async findByNameAndDate(stocks: Array<string>, dateFrom: number, dateTo: number, hashkey?: string): Promise<any> {
        let resultObject: any = {}
        let promiseArray: Array<any> = []

        stocks.forEach((item: string) => {
            promiseArray.push(Records.find({stockName: item, dateMillisecond: {$gt: dateFrom, $lt: dateTo}})) 
        })

        return Promise.all(promiseArray).then(result => {
            stocks.forEach((item: string, index) => {
                resultObject[item] = result[index]
            })
            if(hashkey) client.set(hashkey, JSON.stringify(resultObject))

            return resultObject
        })
    }
}

export const recordsService = new RecordsService();
