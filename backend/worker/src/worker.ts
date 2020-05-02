#!/usr/bin/env node
import * as amqp from 'amqplib/callback_api';
import {API_KEY, TS_DAILY, META_DATA} from "./config"
import * as moment from 'moment'
import axios from "axios"

type Price = {
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string
}

type MainDate = {
    Information: string,
    Symbol: string,
    LastRefreshed: string,
    OutputSize: string,
    TimeZone: string
}

amqp.connect('amqp://localhost', function(error0: any, connection: amqp.Connection) {
    if (error0) { 
        throw error0;
    }
    connection.createChannel(function(error1: any, channel: amqp.Channel) {
        if (error1) {
            throw error1;
        }

        var queue = process.argv[2];

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg: amqp.Message | null) {
            if(msg){
                let message: {date: Date, type: string, userPrice: number, userId: string} = JSON.parse(msg.content.toString())

                axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${message.type}&outputsize=full&apikey=${API_KEY}`)
                    .then(result => {
                        let requestDate = moment(new Date()).format("YYYY-MM-DD")
                        let currentPrice = (<Price>parseField(result.data[TS_DAILY][requestDate])).high
                        let main: MainDate = <MainDate>parseField(result.data[META_DATA]);
                        let price: Price = <Price>parseField(result.data[TS_DAILY][moment(message.date).format("YYYY-MM-DD")])
                        console.log("Here____ ))")
                        let data = {
                            userId: message.userId,
                            currentPrice: currentPrice,
                            requestDM: new Date().getTime(),
                            userPrise: message.userPrice.toString(),
                            requestDate: requestDate,
                            status: parseFloat(price.high) < message.userPrice ? "win" : "lose",
                            main, 
                            price
                        }

                        channel.ack(msg);
                        channel.sendToQueue("STOCKS", Buffer.from(JSON.stringify(data)), {
                            persistent: true
                        });
                        console.log(" [x] Received %s", msg?.content.toString(), JSON.stringify(data, null, 3));
                    })
                    .catch(err => {
                        console.log("axios error", err)
                    })
            }
        }, {
            noAck: false
        }); 
    });
});

let parseField = (obj: Price | MainDate | undefined) => {
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