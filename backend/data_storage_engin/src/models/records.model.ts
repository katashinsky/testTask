import * as mongoose from "mongoose"

const Schema = mongoose.Schema

export interface IRecords extends mongoose.Document {
    stockName: string,
    date: string,
    dateMillisecond: number,
    price: {
        open: string,
        high: string,
        low: string,
        close: string,
        volume: string,
    }
}

const recordsSchema = new Schema({
    stockName: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    dateMillisecond: {
        type: Number,
        required: true,
    },

    price: {
        open: {
            type: String,
            required: true,
        },
        high: {
            type: String,
            required: true,
        },
        low: {
            type: String,
            required: true,
        },
        close: {
            type: String,
            required: true,
        },
        volume: {
            type: String,
            required: true,
        }
    }
})

export let Records = mongoose.model<IRecords>('RecordsData', recordsSchema)
