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
      stockName: string,
      dateFrom: number,
      dateTo: number,
  }
  
  
  