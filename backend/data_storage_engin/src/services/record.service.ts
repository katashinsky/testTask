import {IRecord, Record} from "../models/record.model";

export class RecordService {
    constructor() {}

    public async saveRecord(record: IRecord): Promise<IRecord> {
        let newRecord = new Record(record)
        return await newRecord.save()
    }

    public async findByNameAndDate(name: string, dateFrom: number, dateTo: number): Promise<Array<IRecord>> {
        let arr = await Record.find({"main.Symbol": name, requestDM: {$gt: dateFrom, $lt: dateTo}})
        return arr
    }
}

export const recordService = new RecordService();
