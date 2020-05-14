import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from "../../store/app.reducers"
import * as stockreducer from "../store/stock.reducers"
import { Observable } from 'rxjs';
import * as StocksActions from "../store/stock.actions"
import * as moment from "moment"
declare let CanvasJS

type Point = {x: Date, y: number}
type StocksData = {
  FB?: Array<Point>,
  AAPL?: Array<Point>,
  IBM?: Array<Point>,
  AMZN?: Array<Point>,
  DIS?: Array<Point>,
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  readonly COUNT_MILISECOND: number = 86400000;
  stockState: Observable<stockreducer.State>;

  filterStoksList: Array<{value: string, isSelected: boolean}> = [
    {value: "FB", isSelected: false}, 
    {value: "AAPL", isSelected: true}, 
    {value: "IBM", isSelected: false}, 
    {value: "AMZN", isSelected: false}, 
    {value: "DIS", isSelected: false}
  ]

  filterDateList: {date: string, value: number}[] = [
    {date: "1 week", value: (this.COUNT_MILISECOND * 7)},
    {date: "2 week", value: (this.COUNT_MILISECOND * 14)},
    {date: "1 month", value: (this.COUNT_MILISECOND * 30)},
    {date: "3 mounth", value: (this.COUNT_MILISECOND * 90)},
    {date: "1 year", value: (this.COUNT_MILISECOND * 364)},
    {date: "5 years", value: (this.COUNT_MILISECOND * 1820)},
    {date: "10 years", value: (this.COUNT_MILISECOND * 3640)},
  ]

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.stockState = this.store.select("stock")
    this.stockState.subscribe(newState => {
      console.log("this.stockState.subscribe( __ ", newState)
      let stocksData: StocksData = {};
      
      for (const stockName in newState.data) {
        stocksData[stockName] =  newState.data[stockName].map(item => {
          return {x: new Date(item.date), y: parseFloat(item.price.high)}
        })
      }
    
      this.loadGraph(stocksData)
    })
    
  }

  getGraphData(amount: number){
    let dateTo: number = new Date(moment(new Date()).format("YYYY-MM-DD")).getTime()
    let dateFrom: number = dateTo - amount
    let stocksArray = this.filterStoksList.filter(item => item.isSelected === true).map(item => item.value)
    console.log(stocksArray)
    this.store.dispatch(StocksActions.tryFilterStocks({payload: {stockName: stocksArray, dateFrom, dateTo}}))
  }

  chooseStock(index: number){
    this.filterStoksList[index].isSelected = !this.filterStoksList[index].isSelected
  }

  loadGraph(stockData: StocksData){
    var chart = new CanvasJS.Chart("graph", {
      title: {
        text: "stocks Price"
      },
      axisX: {
        valueFormatString: "MMM YYYY"
      },
      axisY2: {
        title: "Median List Price",
        prefix: "$",
        suffix: ""
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
      },
      data: [{
        type:"line",
        axisYType: "secondary",
        name: "AAPL",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: stockData.AAPL
      },
      {
        type:"line",
        axisYType: "secondary",
        name: "FB",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: stockData.FB
      },
      {
        type:"line",
        axisYType: "secondary",
        name: "DIS",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: stockData.DIS
      },
      {
        type:"line",
        axisYType: "secondary",
        name: "AMZN",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: stockData.AMZN
      },
      {
        type:"line",
        axisYType: "secondary",
        name: "IBM",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: stockData.IBM
      },
     ]
    });
    chart.render();
    
    function toogleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else{
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    
  }

}
