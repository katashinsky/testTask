export interface Stocks {
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
  
export interface FilterData {
    stockName: Array<string>,
    dateFrom: number,
    dateTo: number,
}

export interface StocksData {
    FB?: Array<Stocks>,
    AAPL?: Array<Stocks>,
    IBM?: Array<Stocks>,
    AMZN?: Array<Stocks>,
    DIS?: Array<Stocks>,
}
  
  
  