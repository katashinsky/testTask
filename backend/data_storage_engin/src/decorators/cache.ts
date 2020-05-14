import * as CryptoJS from "crypto-js"
import { SECRET_KEY } from "../config"
import * as redis from "redis"
import { client } from "../server"
import * as  hash from 'object-hash'

export const Cashe = (target: any, method: string, descriptor: PropertyDescriptor) => {
    function originalMethod(){
        let keyValues = arguments[1].req.method === "GET" ? arguments[1].req.query : arguments[1].req.body
        console.log("Object ___ ", JSON.stringify(keyValues, null, 3))
        let hashkey = hash(keyValues)
        console.log("hashkey ___ ", JSON.stringify(hashkey, null, 3))

        client.get(hashkey, (err, value) => {
            if(value === null){
                // @ts-ignore
                descriptor.value.call(this, ...arguments, hashkey)
            }else{
                arguments[0].res.send(JSON.parse(value))
            }
        })
    }

    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this)
        }
    }

    return newDescriptor
}
