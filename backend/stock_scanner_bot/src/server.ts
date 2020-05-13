import * as express from 'express'
import { STOCKS_ARRAY, SECRET_KEY } from "./config"
import { checkIfExist, sendToQueue } from "./utils"
import * as CryptoJS from "crypto-js"
import {UserData} from "./common/entity"

const app: express.Application = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, auth');
    next();
});

app.get('/', async (req, res, next) => {
    let {type, date, userPrice, userId} = req.query

    let data = new UserData(date.toString(), type.toString(), userPrice.toString(), userId.toString())
    sendToQueue(data, type.toString())

    res.send("ok")
}) 

app.listen(3000 , () => {
    // checkIfExist(STOCKS_ARRAY)
    console.log(`Server is running in localhost port 3000`)
})


export default app