 
type Price = {
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string
}

type Stock = {
    stockName: string,
    date: string,
    dateMillisecond: number,
    price: {
        open: string,
        high: string,
        low: string,
        close: string,
        volume: string,
    }
}
