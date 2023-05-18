import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sales } from 'src/app/services/sales-service/sales';
import { SalesService } from 'src/app/services/sales-service/sales-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  clientID = Number(sessionStorage.getItem('clientID'));
  //client_account = sessionStorage.getItem('username');

  sales: Sales;
  public salesList: Sales[] = [];
  showMe: boolean;

  //Infinite scroll
  private offset = 0;
  private limit=50;


  constructor(private salesService: SalesService) { this.sales = new Sales(); }

  ngOnInit(): void {
    this.getSales();
    this.pagination(this.limit,this.offset);
  }
  public getSales(): void {
    this.salesService.getSales().subscribe(
      (response: Sales[]) => {
        let numberOfSales = 0;
        numberOfSales = response.length;
        if (numberOfSales > 0) {
          this.salesList = response;
          //order by
          this.salesList.sort((a, b) => {
            let sales_date_a = a.sales_date;
            let sales_date_b = b.sales_date;

            if (sales_date_a < sales_date_b) return -1;
            if (sales_date_a > sales_date_b) return 1;

            return 0;
          })
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  toggleTag() {
    this.showMe = !this.showMe;
  }
  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.salesService.getSalesPagination(limit,offset).subscribe((response: Sales[]) => {this.salesList=[];this.salesList.push(...response);});
   }
   filterData(){
   }
}