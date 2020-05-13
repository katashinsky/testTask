import * as moment from 'moment';
import { META_DATA, TS_DAILY } from '../configs';
import { MainDate, Price, QDFromClient, QDToEngine } from '../entity';

export let parseField = (obj: Price | MainDate | undefined) => {
    if(!obj) {
        return {
            open: "0",
            high: "0",
            low: "0",
            close: "0",
            volume: "0"
        }
    }

    let newObj = {}
    
    for (const field in obj) {
        // @ts-ignore
        newObj[field.split(" ").join("").split(".")[1].toString()] = obj[field]
    }

    return newObj
}

export let createInfoObject = (result: any, message: QDFromClient): QDToEngine => {
    let requestDate = moment(new Date()).format("YYYY-MM-DD")
    let currentPrice = (<Price>parseField(result.data[TS_DAILY][requestDate])).high
    let main: MainDate = <MainDate>parseField(result.data[META_DATA]);
    let price: Price = <Price>parseField(result.data[TS_DAILY][moment(message.date).format("YYYY-MM-DD")])
    
    return {
        hashKey: message.hashKey,
        data: {
            currentPrice: currentPrice,
            requestDM: new Date().getTime(),
            main, 
            price
        }
    }
}