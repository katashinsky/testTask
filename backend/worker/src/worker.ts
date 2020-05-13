#!/usr/bin/env node
import * as amqp from 'amqplib/callback_api';
import {API_KEY, TS_DAILY, META_DATA} from "./configs"
import axios from "axios"
import {QDFromClient, QDToEngine} from './entity'
import {createInfoObject} from './utils'


amqp.connect('amqp://localhost', (error0: any, connection: amqp.Connection) => {
    if (error0) throw error0; 

    connection.createChannel((error1: any, channel: amqp.Channel) => {
        if (error1) throw error1; 

        var queue = process.argv[2];

        channel.assertQueue(queue, { durable: true });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg: amqp.Message | null) => {
            if(msg){
                let message: QDFromClient = JSON.parse(msg.content.toString())

                axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${message.type}&outputsize=full&apikey=${API_KEY}`)
                    .then(result => {
                        let data: QDToEngine = createInfoObject(result, message)

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