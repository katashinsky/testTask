import { NextFunction, Request, Response } from 'express';
import {userService} from "../services/users.service"

export let authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let {auth} = req.headers;
    req.body.currentUser = await userService.findByField("token", auth)
    console.log(req.body.currentUser)

    if(req.body.currentUser) next()
    else res.send("forbidden")
}
