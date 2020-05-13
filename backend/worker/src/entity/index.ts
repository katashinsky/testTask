export type Price = {
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string
}

export type MainDate = {
    Information: string,
    Symbol: string,
    LastRefreshed: string,
    OutputSize: string,
    TimeZone: string
}

export type QDFromClient = {
    date: Date, 
    type: string, 
    hashKey: string
}

export type QDToEngine = {
    hashKey: string
    data: {
        currentPrice: string,
        requestDM: number,
        main: MainDate, 
        price: Price
    }
}