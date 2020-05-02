import * as express from 'express';
import { recordController, RecordController } from '../controllers/record.contriller';

class RecordRouter {
    constructor(private router: express.Router, private _recordController: RecordController) {
        this.router.route('/filter')
            .get(this._recordController.getFilteredDate.bind(this._recordController));
    }

    get recordRouter() {
        return this.router;
    }
}

export const recordRouter = new RecordRouter(express.Router(), recordController).recordRouter;
