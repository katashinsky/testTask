import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { SNACKBAR_DURATION, VALID } from 'src/app/config/constants';
import axios from 'axios';
import moment from "moment"

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stockForm: FormGroup
  
  constructor(private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.stockForm = new FormGroup({
      stockName: new FormControl("", [
        Validators.required,
      ]),
      stockDate: new FormControl("", [
        Validators.required,
      ]), 
      stockPrice: new FormControl("", [
        Validators.required,
      ]),  
    });
  }

  trade(){
    if (this.stockForm.status === VALID) {
      let {stockName, stockDate, stockPrice} = this.stockForm.value
      
      axios({
        method: "get",
        url: `http://localhost:3000/?type=${stockName}&date=${moment(stockDate).format("YYYY-MM-DD")}&userPrice=${stockPrice}&userId=${localStorage.getItem("userId")}`,
        headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
          this.showSnakBar("Success")
        })
        .catch(err => {
          this.showSnakBar("Fail")
        })
    } else {
      this.showSnakBar("Enter valid data")
    }
  }

  showSnakBar(text: string){
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      duration: SNACKBAR_DURATION * 1000,
      verticalPosition: 'top',
      data: text
    })
  }
}
