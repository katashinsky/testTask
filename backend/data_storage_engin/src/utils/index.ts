import * as amqp from 'amqplib/callback_api';
import {IRecord, Record} from "../models/record.model"
import {recordService, RecordService} from "../services/record.service"
import {recordsService, RecordsService} from "../services/records.service"

class Utils {
    private static instance: Utils;

    private constructor(private __recordService: RecordService, private _recordsService: RecordsService) {}

    public static getInstance(recordService: RecordService, recordsService: RecordsService): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils(recordService, recordsService);
        }

        return Utils.instance;
    }

    public startChannel = () => {
        amqp.connect('amqp://localhost', (error0: any, connection: amqp.Connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1: any, channel: amqp.Channel) => {
                if (error1) throw error1

                let queue = "STOCKS"

                channel.assertQueue(queue, {
                    durable: true
                });

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

                channel.consume("RECORDS", (msg: amqp.Message | null) => {
                    if (msg) {
                        this._recordsService.saveRecords(JSON.parse(msg.content.toString()))
                            .then(result => {
                                channel.ack(msg);
                                console.log("Result data: ", result)
                            })
                            .catch(error => {
                                console.log("error Happened", error)
                            })

                        console.log(" [x] Received RECORDS %s")
                    }
                }, {
                    noAck: false
                });

                channel.consume(queue, (msg: amqp.Message | null) => {
                    if (msg) {
                        this.__recordService.saveRecord(JSON.parse(msg.content.toString()))
                            .then((res: IRecord) => {
                                channel.ack(msg);
                                console.log(" [x] Received STOCKS %s", JSON.stringify(JSON.parse(msg.content.toString()), null, 3));
                            })
                            .catch(error => {
                                console.log("error Happened", error)
                            })
                    }
                }, {
                    noAck: false
                });
            });
        });
    }
}

export let utils = Utils.getInstance(recordService, recordsService)

