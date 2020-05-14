import * as mongoose from "mongoose"

const Schema = mongoose.Schema

export enum Status {
    WIN = "win",
    LOSE = "lose",
}

export interface IRecord extends mongoose.Document {
    userId: string,
    status: Status,
    currentPrice: string,
    requestDM: number,
    userPrise: string,

    main: {
        Information: string,
        Symbol: string,
        LastRefreshed: string,
        OutputSize: string,
        TimeZone: string,
    },

    price: {
        open: string,
        high: string,
        low: string,
        close: string,
        volume: string,
    }
}

const recordSchema = new Schema({

    userId: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    requestDM: {
        type: Number,
        required: true,
    },

    currentPrice: {
        type: String,
        required: true,
    },

    userPrice: {
        type: String,
        required: true,
    },

    main: {
        Information: {
            type: String,
            required: true,
        },
        Symbol: {
            type: String,
            required: true,
        },
        LastRefreshed: {
            type: String,
            required: true,
        },
        OutputSize: {
            type: String,
            required: true,
        },
        TimeZone: {
            type: String,
            required: true,
        }
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

export let Record = mongoose.model<IRecord>('Record', recordSchema)
