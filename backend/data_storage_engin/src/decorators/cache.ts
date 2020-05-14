import * as hash from 'object-hash'
import { client } from "../server"

export const Cashe = (target: any, method: string, descriptor: PropertyDescriptor) => {
    function originalMethod(){
        let keyValues = arguments[1].req.method === "GET" ? arguments[1].req.query : arguments[1].req.body
        let hashkey = hash(keyValues)

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
