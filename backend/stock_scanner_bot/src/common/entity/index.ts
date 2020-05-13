import { SECRET_KEY } from "../../config";
import * as CryptoJS from "crypto-js"

export class UserData {
    private hashKey: string;

    constructor( private date: string, private type: string, userPrice: string, userId: string){
            this.hashKey = CryptoJS.AES.encrypt(JSON.stringify({userPrice, userId}), SECRET_KEY).toString();
        }
}