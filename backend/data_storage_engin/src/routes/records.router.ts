import * as express from 'express';
import { recordsController, RecordsController } from '../controllers/records.controller';
import {authMiddleware} from "../middlewares/auth.middleware";

class RecordsRouter {
    constructor(private router: express.Router, private _recordsController: RecordsController) {
        this.router.route('/record')
            .get(this._recordsController.getRecordInfo.bind(this._recordsController));

        this.router.route('/filter')
            .get(authMiddleware, this._recordsController.getFilteredDate.bind(this._recordsController));
    }

    get recordsRouter() {
        return this.router;
    }
}

export const recordsRouter = new RecordsRouter(express.Router(), recordsController).recordsRouter;
