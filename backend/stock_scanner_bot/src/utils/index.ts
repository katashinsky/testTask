import {connect, Connection, Channel, Message} from 'amqplib/callback_api';
import axios from "axios"
import {API_KEY, EXIST, NOT_EXIST, STOCKS_ARRAY, META_DATA, TS_DAILY, SYMBOL} from "../config"
import { type } from 'os';

type Price = {
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string
}

type Stock = {
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

export let sendToQueue = (data: {date: string, type: string, userPrice: number, userId: string} | Array<Stock>, type: string) => {
    
    connect('amqp://localhost', function(error0: any, connection: Connection) {
        if (error0) throw error0 

        connection.createChannel(function(error1: any, channel: Channel) {
            if (error1) throw error1; 

            let queue = type;

            channel.assertQueue(queue, {
                durable: true
            });

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
                persistent: true
            });
            console.log(" [x] Sent '%s'", JSON.stringify(data, null, 3));
        });
    
        setTimeout(function() {
            connection.close();
        }, 500);
    });

}

export let checkIfExist = async (stocksArray: Array<string>) => {
    let requestsArray = stocksArray.map(item => {
        return request(item)
    })

    try {
        let reqArr: Array<Promise<any>> = [];

        let results = (await Promise.all(requestsArray)).map(item => item.data)
            if(results.length === 0){
                reqArr.push(requestStocksData(stocksArray[1], API_KEY))               
            }

        // let stocksData = (await Promise.all(reqArr)).map(item => item.data)
        // sendToQueue(parseData(stocksData), "RECORDS")
        // console.log("DATA ___ ", parseData(stocksData)[0].stockName)
    } catch (error) {
        console.log(error)        
    }
}

let parseData = (stocksArray: any): Array<Stock> => {
    let array: Array<Stock> = [];

    stocksArray.forEach((item: any) => {
        for (const key in item[TS_DAILY]) {
            array.push({
                date: key,
                stockName: item[META_DATA][SYMBOL],
                dateMillisecond: new Date(key).getTime(), 
                price: <Price>parseField(item[TS_DAILY][key])
            }) 
        }
    })

    return array
}

export let request = async (stockName: string): Promise<any> => {
    return await axios.get(`http://localhost:3001/api/records/record?stockName=${stockName}`)
}

export let requestStocksData = async (stockName: string, apiKey: string): Promise<any> => {
    return await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&outputsize=full&apikey=${apiKey}`)
}

let parseField = (obj: Price) => {
    let newObj = {}
    
    for (const field in obj) {
        // @ts-ignore
        newObj[field.split(" ").join("").split(".")[1].toString()] = obj[field]
    }

    return newObj
}