import * as express from 'express'
import { STOCKS_ARRAY } from "./config"
import { checkIfExist, sendToQueue } from "./utils"

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
    console.log(type, date)
    sendToQueue({date: date.toString(), type: type.toString(), userPrice: parseFloat(userPrice.toString()), userId: userId.toString()}, type.toString())
    res.send("ok")
}) 

app.listen(3000 , () => {
    checkIfExist(STOCKS_ARRAY)
    console.log(`Server is running in localhost port 3000`)
})


export default app