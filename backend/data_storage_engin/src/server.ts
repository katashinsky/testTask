import * as express from 'express'
import * as path from 'path'
import * as mongoose from "mongoose"
import {apiRouter} from './routes/api.router'
import * as bodyParser from "body-parser"
import {utils} from "./utils/index"

require('dotenv').config({path: path.resolve(process.cwd(), '.env')})

const app: express.Application = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, auth');
    next();
});

app.use('/api', apiRouter);

app.get('/', async (req, res, next) => {
    res.send("ok")
})

mongoose.connect("mongodb+srv://dmitriy:DIMON4523@cluster0-0ato1.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true})
    .then(result => {
        console.log('========SUCCESS========')
        utils.startChannel()

        app.listen(3001)
    })
    .catch(err => {
        console.log(err)
    })

export default app
